// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UserRepository } from 'src/auth/user.repository';
// import { CreatePostDTO } from './dto/create-post.dto';
// import { FindUserId } from './dto/find-user-id.dto';
// import { UpdatePostDTO } from './dto/update-post.dto';
// import { Post } from './entities/post.entity';
// import { PostInterface } from './interface/post.interface';
// import { PostRepository } from './post.repository';



// @Injectable()
// export class PostService {
//   constructor(
//     @InjectRepository(PostRepository)
//     private postRepository: PostRepository,
//     @InjectRepository(UserRepository)
//     private userRepository: UserRepository,
//   ) {}
//   create(createPostdto: CreatePostDTO) {
//     const result =
//       this.postRepository.addPost(createPostdto);

//     if (!result) {
//       return console.error('undefined');
//     } else {
//       return result;
//     }
//   }

//   async findByUserID(
//     user_id: FindUserId,
//   ): Promise<Post[]> {
//     const initialData = await this.postRepository.findByUserID(user_id);
//     console.log(initialData);
//     let result: Post[] = [];
//     for (let i = 0; i < initialData.length; i++) {
//       const post = await this.postRepository.getPosts();
//      return post;
//     }
//     console.log(result);

//     if (!result) {
//       console.error('undefined');
//     } else {
//       return result;
//     }
//   }



//   update(updatePostDto: UpdatePostDTO[]): Promise<Post[]>{

//     const result = this.postRepository.updatePost(updatePostDto)

//     if (!result) {
//       console.error(e => console.log(e));
//     } else {
//       return result;
//     }

//   }
//   async getPost(postID): Promise<Post> {
//     const post = await this.postRepository.getPost(postID);
//     return post;
//   }

//   getPosts() {
//     return this.postRepository.getPosts();
//   }
// }
