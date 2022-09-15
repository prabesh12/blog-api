import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { UserService } from 'src/auth/user.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { FindUserId } from './dto/find-user-id.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
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

  async findByUserID(user_id: string): Promise<Post[]> {
    const initialData = await this.postRepository.findByUserID(user_id);
    console.log(initialData);

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
async getPost(postID: string): Promise<Post> {
    const post = await this.postRepository.getPost(postID);
    return post;
  }

async getPosts(): Promise<Post[]> {
  const posts= await this.postRepository.getPosts();
 return  posts ;
  }

  async deletePost(id: string){
    return await this.postRepository.deletePost(id);
  }

}
