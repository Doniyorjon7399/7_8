import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.postRepo.create(createPostDto);
    const postData = await this.postRepo.save(post);
    return postData;
  }

  async findAll() {
    return await this.postRepo.find();
  }

  async findOne(id: string) {
    return await this.postRepo.findOne({ where: { id } });
  }

  async update(id: string, post: CreatePostDto) {
    return await this.postRepo.update(id, post);
  }

  async remove(id: string) {
    const result = await this.postRepo.delete(id);
    return result;
  }
}
