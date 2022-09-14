// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { PostService } from './post.service';
// import { CreatePostDTO } from './dto/create-post.dto';
// import { UpdatePostDTO } from './dto/update-post.dto';

// @Controller('post')
// export class PostController {
//   constructor(private readonly postService: PostService) {}

//   @Post("/post")
//   create(@Body() createPostDto: CreatePostDTO) {
//     return this.postService.create(createPostDto);
//   }

//   @Get()
//   findAll() {
//     return this.postService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.postService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDTO) {
//     return this.postService.update(+id, updatePostDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.postService.remove(+id);
//   }
// }
