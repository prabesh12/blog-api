import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { Posts } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
  ) {}
  create(createPostdto: CreatePostDTO) {
    const result = this.postRepository.addPost(createPostdto);

    if (!result) {
      return console.error('undefined');
    } else {
        console.log(result);
      return result;
    }
  }

  async findByUserID(user_id: string): Promise<Posts[]> {
    console.log(user_id);
    const initialData = await this.postRepository.findByUserID(user_id);
    console.log(initialData)
    if (!initialData) {
      console.error('undefined');
    } else {
      return initialData;
    }
  }

   update(id: string, updatePostDto: UpdatePostDTO){
    const result = this.postRepository.updatePost(id, updatePostDto);

    if (!result) {
       throw new NotFoundException();
    } else {
      return result;
    }
  }
async getPost(postID: string): Promise<Posts> {
  
    const post = await this.postRepository.getPost(postID);

    console.log("I am single post by user id", postID)
    return post;
  }

async getPosts(): Promise<Posts[]> {
  const posts= await this.postRepository.getPosts();
 return  posts ;
  }

  async deletePost(id: string){
    return await this.postRepository.deletePost(id);
  }



  createComment(createCommentdto: CreateCommentDTO) {
    const result = this.postRepository.addComment(createCommentdto);

    if (!result) {
      return console.error('undefined');
    } else {
        console.log(result);
      return result;
    }
  }

  async findByPostId(post_id: string): Promise<Posts[]> {
    console.log(post_id);
    const initialData = await this.postRepository.getCommentsByPostId(post_id);
    console.log(initialData)
    if (!initialData) {
      console.error('undefined');
    } else {
      return initialData;
    }
  }

   updateComment(id: string, updateCommentDto: UpdateCommentDto){
    const result = this.postRepository.updateComment(id, updateCommentDto);

    if (!result) {
       throw new NotFoundException();
    } else {
      return result;
    }
  }
async getComment(commentId: string): Promise<Posts> {
  
    const comment = await this.postRepository.getPost(commentId);

    console.log("I am single post by user id", commentId)
    return comment;
  }

async getComments(): Promise<Posts[]> {
  const comments= await this.postRepository.getCommnets();
 return  comments ;
  }

  async deleteComment(id: string){
    return await this.postRepository.deleteComment(id);
  }

}
