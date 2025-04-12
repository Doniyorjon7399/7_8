import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'posts',
})
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  name: string;
}
