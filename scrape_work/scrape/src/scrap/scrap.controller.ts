import { Controller, Post } from '@nestjs/common';
import { ScrapService } from './scrap.service';

@Controller('scrap')
export class ScrapController {
  constructor(private readonly scrapService: ScrapService) {}

  @Post('/')
  postNewsPage() {
    return this.scrapService.postNewsPage();
  }
}
