import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }
  @Get()
  findAllComment() {
    return this.commentsService.getComments();
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOneComment(@Param('id') id: string) {
    console.log('I am get post by post id');
    return this.commentsService.getComment(id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateComment(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }
  @Delete(':id')
  removeComment(@Param('id') id: string) {
    console.log(id, 'is deleted');
    return this.commentsService.deleteComment(id);
  }
}
