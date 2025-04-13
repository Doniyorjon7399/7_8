import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly PostService: PostService) {}

  @Post()
  // @UseGuards(AuthGuard)
  async create(@Body() createCategoryDto: CreatePostDto) {
    const post = await this.PostService.create(createCategoryDto);
    return { message: 'succes', post };
  }

  @Get()
  findAll() {
    return this.PostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.PostService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: CreatePostDto) {
    this.PostService.update(id, data);
    return { message: 'succes' };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.PostService.remove(id);
    return { message: 'succes' };
  }
}
