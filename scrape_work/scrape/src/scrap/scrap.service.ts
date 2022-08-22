import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scrap } from './entities';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScrapService {
  constructor(
    @InjectRepository(Scrap)
    private readonly NewsRepository: Repository<Scrap>,
  ) {}

  async postNewsPage() {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: '/usr/bin/chromium-browser',
    });

    const page = await browser.newPage();

    await page.goto(`https://news.daum.net/`, {
      waitUntil: 'networkidle2',
    });

    const result = await page.evaluate(() => {
      const result_array = [];
      document.querySelectorAll('.item_issue').forEach((e) => {
        const data = {
          Title: e
            .querySelector('.tit_g')
            .textContent.replace(/\n|\r|\s*/g, ''),
          ArticleUrl: e.querySelector('.link_txt').getAttribute('href'),
          Author: e.querySelector('.logo_cp img').getAttribute('alt'),
          Category: e.querySelector('.txt_category').textContent,
          ImageUrl: $('.wrap_thumb > img').attr('src'),
        };
        result_array.push(data);
      });
      return result_array;
    });
    const postresult = await Promise.all(
      result.map(async (el) => {
        const newsdata = await this.NewsRepository.findOne({
          where: { Title: el.Title },
        });

        if (!newsdata) {
          await this.NewsRepository.save({
            Title: el.Title,
            ArticleUrl: el.ArticleUrl,
            Author: el.Author,
            Category: el.Category,
            ImageUrl: el.ImageUrl,
          });
          return '저장되었습니다.';
        }
        return '이미 존재하는 포스트입니다.';
      }),
    );

    await browser.close();
    return postresult;
  }
}
