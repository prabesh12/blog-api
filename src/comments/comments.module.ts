import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './entities/comment.entity';
import { CommentRepository } from './comment.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Comments])],
  controllers: [CommentsController],
  providers: [CommentsService,CommentRepository],
  exports:[CommentsService]

})
export class CommentsModule {}
