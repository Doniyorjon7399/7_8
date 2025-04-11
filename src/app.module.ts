import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CategoriesModule, UsersModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
