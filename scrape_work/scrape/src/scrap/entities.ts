import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Scrap extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Title: string;

  @Column()
  ArticleUrl: string;

  @Column()
  Author: string;

  @Column()
  Category: string;

  @Column()
  ImageUrl: string;
}
