import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { CommentsService } from 'src/comments/comments.service';
import { Comments } from 'src/comments/entities/comment.entity';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Comments]), CommentsModule],
  controllers: [PostController,],
  providers: [PostService, PostRepository],
  exports:[PostService]
})
export class PostModule {}
