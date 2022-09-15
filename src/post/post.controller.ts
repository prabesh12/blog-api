import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Posts } from './entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPostDto: CreatePostDTO) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.getPosts();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('I am get post by post id');
    return this.postService.getPost(id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDTO) {
    return this.postService.update(id, updatePostDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id, 'is deleted');
    return this.postService.deletePost(id);
  }

  @Post('comment')
  @UseGuards(JwtAuthGuard)
  createComment(@Body() createPostDto: CreatePostDTO) {
    return this.postService.create(createPostDto);
  }

  @Get('comments')
  findAllComment() {
    return this.postService.getComments();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOneComment(@Param('id') id: string) {
    console.log('I am get post by post id');
    return this.postService.getComment(id);
  }
  @Get(':id/comments')
  @UseGuards(JwtAuthGuard)
  getCommentByPostId(@Param('id') id:string): Promise<Posts[]>{
    console.log("I am getComent by id in commentId", id)
    return this.postService.findByPostId(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateComment(@Param('id') id: string, @Body() updatePostDto: UpdatePostDTO) {
    return this.postService.updateComment(id, updatePostDto);
  }
  @Delete(':id')
  removeComment(@Param('id') id: string) {
    console.log(id, 'is deleted');
    return this.postService.deleteComment(id);
  }
}
