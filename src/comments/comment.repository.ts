import { Injectable, Param } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';
import console from 'console';
import { CreateCommentDTO } from 'src/post/dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comments } from './entities/comment.entity';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comments)
    private readonly commentRepositiries: MongoRepository<Comments>,
  ) {}

  // create comment logic
  async addComment(createCommentDto: CreateCommentDTO): Promise<Comments> {
    const { comment, user_name, user_id, post_id } = createCommentDto;
    const comments = new Comments();
    comments.comment_id = v4();
    comments.post_id = post_id;
    comments.comment = comment;
    comments.user_name = user_name;
    comments.user_id = user_id;
    try {
      await this.commentRepositiries.save(comments);
      return comments;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPost(postID: string): Promise<Comments> {
    const post = await this.commentRepositiries.findOne({
      where: {
        post_id: postID,
      },
    });
    return post;
  }

  // comments section
  async getComment(commentId: string): Promise<Comments> {
    const comment = await this.commentRepositiries.findOne({
      where: {
        comment_id: commentId,
      },
    });
    return comment;
  }

  async getCommnets(): Promise<Comments[]> {
    const comments = await this.commentRepositiries.find();
    return comments;
  }
  async getCommentsByPostId(id: string): Promise<Comments[]> {
    const result = await this.commentRepositiries.findBy({ post_id: id });
    return result;
  }
  async updateComment(commentId: string, updateCommentDTO: UpdateCommentDto) {
    console.log(updateCommentDTO);
    console.log(updateCommentDTO);
    const updateddata = await this.commentRepositiries.updateOne(
      { commentId: commentId },
      { $set: updateCommentDTO },
    );

    if (updateddata.result.n) {
      return 'comment is updated';
    } else return 'comment is not updated';
  }

  async deleteComment(comment_id: string) {
    const deletedPost = await this.commentRepositiries.deleteOne({
      comment_id: comment_id,
    });
    if (deletedPost.result.n) return 'comment is deleted successfully';
    else return 'please try again';
  }
  // helper functions
}
