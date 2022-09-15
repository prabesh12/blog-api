import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@nestjs/common/decorators';



@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  controllers: [PostController,],
  providers: [PostService],
})
export class PostModule {}
