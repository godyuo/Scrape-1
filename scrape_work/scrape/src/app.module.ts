import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from './scrape/news.module';
import { Scrap } from './scrap/entities';
import { ScrapModule } from './scrap/scrap.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Scrap],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
      logger: 'file',
    }),
    NewsModule,
    ScrapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
