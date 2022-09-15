import { Injectable, Param } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { v4 } from 'uuid';
import console from 'console';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepositiries: MongoRepository<Posts>,
  ) {}
// create post logic
  async addPost(createPostDTO: CreatePostDTO): Promise<Posts> {
    const { title, description,user_name, user_id } = createPostDTO;
    const post = new Posts();
    post.post_id= v4();
    post.title = title;
    post.description = description;
    post.user_name= user_name;
    post.user_id = user_id;
    console.log(post);
    try {
      await this.postRepositiries.save(post);
      return post;
    } catch (error) {
      throw new ConflictException('post already exists');
    }
  }
  
 // create comment logic
  async addComment(createCommentDto: CreateCommentDTO): Promise<Posts> {
    const { comment, user_name, user_id, post_id } = createCommentDto;
    const comments = new Posts();
    comments.comment_id= v4();
    comments.post_id=post_id
    comments.comment = comment;
    comments.user_name= user_name;
    comments.user_id = user_id;
    console.log(comments);
    try {
      await this.postRepositiries.save(comments);
      return comments;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPost(postID:string): Promise<Posts> {
    const post = await this.postRepositiries.findOne({
      where: {
        post_id: postID,
      },
    });
    return post;
  }

  async updatePost(postID :string, updatePostDTO: UpdatePostDTO)  {
    console.log(postID)
    console.log(updatePostDTO)
    const updateddata = await this.postRepositiries.updateOne({post_id:postID},{$set: updatePostDTO });

    if(updateddata.result.n){
      return "post is updated";
    }

    else
    return "post is not found"
  }
  async findByUserID( id: string): Promise<Posts[]> {
    const result = await this.postRepositiries.findBy({user_id:id});
    return result;
  }
  async deletePost(postID:string)  {
    const deletedPost = await this.postRepositiries.deleteOne({post_id:postID});
    if(deletedPost.result.n)
    return "post is deleted successfully";

    else
    return "please try again"
  }

  // comments section

  async getComment(commentId:string): Promise<Posts>{
    const comment = await this.postRepositiries.findOne({
      where: {
        comment_id: commentId,
      },
    });
    return comment;
  }


  async getCommnets(): Promise<Posts[]> {
    const comments = await this.postRepositiries.find();
    return comments;
  }

  async getCommentsByPostId( id: string): Promise<Posts[]> {
    const result = await this.postRepositiries.findBy({post_id:id});
    return result;
  }

  async getPosts(): Promise<Posts[]> {
    const posts = await this.postRepositiries.find();
    return posts;
  }


  async updateComment(commentId :string, updateCommentDTO: UpdateCommentDto)  {
    console.log(updateCommentDTO)
    console.log(updateCommentDTO)
    const updateddata = await this.postRepositiries.updateOne({commentId:commentId},{$set: updateCommentDTO });

    if(updateddata.result.n){
      return "comment is updated";
    }

    else
    return "comment is not updated"
  }

  async deleteComment(comment_id:string)  {
    const deletedPost = await this.postRepositiries.deleteOne({comment_id:comment_id});
    if(deletedPost.result.n)
    return "comment is deleted successfully";

    else
    return "please try again"
  }
  // helper functions
}
