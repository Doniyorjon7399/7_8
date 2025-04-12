import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.dto';

@Controller('categories')
export class PostController {
  constructor(private readonly PostService: PostService) {}

  @Post('create')
  // @UseGuards(AuthGuard)
  async create(@Body() createCategoryDto: CreatePostDto) {
    return await this.PostService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.PostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.PostService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.PostService.update(+id, CreatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.PostService.remove(+id);
  }
}
