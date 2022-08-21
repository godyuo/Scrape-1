import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scrap } from './entities';
import { ScrapController } from './scrap.controller';
import { ScrapService } from './scrap.service';

@Module({
  imports: [TypeOrmModule.forFeature([Scrap])],
  controllers: [ScrapController],
  providers: [ScrapService],
})
export class ScrapModule {}
