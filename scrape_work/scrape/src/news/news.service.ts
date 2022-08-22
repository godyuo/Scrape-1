import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as puppeteer from 'puppeteer';
import { Scrap } from 'src/scrap/entities';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(Scrap)
    private readonly NewsRepository: Repository<Scrap>,
  ) {}
  async getNewsPage() {

        const Serchdata = await this.NewsRepository.find()
       
    return Serchdata
    // const browser = await puppeteer.launch({
    //   headless: true,
    //   args: ['--no-sandbox', '--disable-setuid-sandbox'],
    //   executablePath: '/usr/bin/chromium-browser',
    // });

    // const page = await browser.newPage();

    // await page.goto(`https://news.daum.net/`, {
    //   waitUntil: 'networkidle2',
    // });

    // const result = await page.evaluate(() => {
    //   const result_array = [];
    //   document.querySelectorAll('.item_issue').forEach((e) => {
    //     const data = {
    //       Title: e
    //         .querySelector('.tit_g')
    //         ?.textContent.replace(/\n|\r|\s*/g, ''),
    //       ArticleUrl: e.querySelector('.link_txt').getAttribute('href'),
    //       Author: e.querySelector('.logo_cp img').getAttribute('alt'),
    //       Category: e.querySelector('.txt_category').textContent,
    //       ImageUrl: $('.wrap_thumb > img').attr('src'),
    //     };
    //     result_array.push(data);
    //   });
    //   return result_array;
    // });

    // await browser.close();
    // return result;
  }
}
