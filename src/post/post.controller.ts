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
import { CommentsService } from 'src/comments/comments.service';
import { Comments } from 'src/comments/entities/comment.entity';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentsService: CommentsService,
  ) {}
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

  @Get(':id/comments')
  @UseGuards(JwtAuthGuard)
  getCommentByPostId(@Param('id') id: string): Promise<Comments[]> {
    console.log('I am getComent by id in commentId', id);
     return this.commentsService.findByPostId(id)
  }
}
