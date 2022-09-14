import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { User } from 'src/auth/entities/user.entity';
import { FindUserId } from './dto/find-user-id.dto';
import { title } from 'process';
import { UpdateWriteOpResult } from 'mongoose';
@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepositiries: MongoRepository<Post>,
  ) {}

  async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
    const { title, description } = createPostDTO;
    const post = new Post();
    post.title = title;
    post.description = description;
    try {
      await this.postRepositiries.save(post);
      return post;
    } catch (error) {
      throw new ConflictException('post already exists');
    }
  }

  async getPost(postID): Promise<Post> {
    const post = await this.postRepositiries.findOne({
      where: {
        id: postID,
      },
    });
    return post;
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.postRepositiries.find();
    return posts;
  }

  async editPost(postID, updatePostDTO: UpdatePostDTO) {
    const editedPost = await this.postRepositiries.updateOne(
      { id: postID },
      updatePostDTO,
    );
    return editedPost;
  }
  async findByUserID(id: FindUserId): Promise<Post[]> {
    const result = await this.postRepositiries.find({
      where: {
        user_id: id.user_id,
      },
    });

    return result;
  }

  async deletePost(postID): Promise<any> {
    const deletedPost = await this.postRepositiries.deleteOne(postID);
    return deletedPost;
  }

  // helper functions
}
