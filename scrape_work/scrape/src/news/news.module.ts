import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scrap } from 'src/scrap/entities';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [TypeOrmModule.forFeature([Scrap])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
