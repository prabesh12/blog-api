import {
  Body,
  Controller,
  Put,
  Param,
  Post,
  Get,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { CreatePostDTO } from 'src/post/dto/create-post.dto';
import { PostService } from 'src/post/post.service';
import { SignInDto } from './dto/sign-in.dto';
import { Posts } from 'src/post/entities/post.entity';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

//
@Controller('user')
export class AuthController {
  constructor(
    private authService: AuthService,
    private postService: PostService,
  ) {}

  @Post('/sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }
  @Post('/sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<any> {
    return this.authService.signIn(signInDto);
  }

  @Get(':id/post')
  getPostByUserId(@Param('id') id: string): Promise<Posts[]> {
    console.log('I am getpost by id in auth', id);
    return this.postService.findByUserID(id);
  }
}
