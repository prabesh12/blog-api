import { Body, Controller, Put, Param, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

import { User } from './entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

// 
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }
  @Post('/sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<any> {
    return this.authService.signIn(signInDto);
  }
  
}
