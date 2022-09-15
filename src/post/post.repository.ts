import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepositiries: MongoRepository<Post>,
  ) {}

  async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
    const { title, description,user_name, user_id } = createPostDTO;
    const post = new Post();
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

  async getPost(postID:string): Promise<Post> {
    const post = await this.postRepositiries.findOne({
      where: {
        post_id: postID,
      },
    });
    return post;
  }
  async getPosts(): Promise<Post[]> {
    const posts = await this.postRepositiries.find();
    return posts;
  }

  async updatePost(postID :string, updatePostDTO: UpdatePostDTO) {
    const editedPost = await this.postRepositiries.updateOne(
      { postID },
      updatePostDTO,
    );
    return editedPost;
  }
  async findByUserID(id: string): Promise<Post[]> {
    const result = await this.postRepositiries.find({where:{user_id: id}});
    return result;
  }

  async deletePost(postID:string)  {
    const deletedPost = await this.postRepositiries.deleteOne({postID});
    return deletedPost;
  }
  // helper functions
}
