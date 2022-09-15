import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comments } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    private commentRepository: CommentRepository,
  ) {}
  createComment(createCommentdto: CreateCommentDto) {
    const result = this.commentRepository.addComment(createCommentdto);

    if (!result) {
      return console.error('undefined');
    } else {
      return result + "Comment Successfully created";
    }
  }

  async findByPostId(post_id: string): Promise<Comments[]> {
    console.log(post_id);
    const initialData = await this.commentRepository.getCommentsByPostId(post_id);
    console.log(initialData)
    if (!initialData) {
      console.error('undefined');
    } else {
      return initialData;
    }
  }

   updateComment(id: string, updateCommentDto: UpdateCommentDto){
    const result = this.commentRepository.updateComment(id, updateCommentDto);

    if (!result) {
       throw new NotFoundException();
    } else {
      return result;
    }
  }
async getComment(commentId: string): Promise<Comments> {
  
    const comment = await this.commentRepository.getPost(commentId);

    console.log("I am single post by user id", commentId)
    return comment;
  }

async getComments(): Promise<Comments[]> {
  const comments= await this.commentRepository.getCommnets();
 return  comments ;
  }

  async deleteComment(id: string){
    return await this.commentRepository.deleteComment(id);
  }

}
