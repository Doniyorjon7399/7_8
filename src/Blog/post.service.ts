import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private categoryRepo: Repository<Post>) {}
  async create(createPostDto: CreatePostDto) {
    const post = this.categoryRepo.create(createPostDto);
    const postData = await this.categoryRepo.save(post);
    return postData;
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, createPostDto: CreatePostDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
