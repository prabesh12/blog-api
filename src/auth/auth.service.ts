import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtPayload } from './jwt-payload';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(UserService)
    private userRepository: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    return this.userRepository.signUp(signUpDto);
    
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    console.log(signInDto)
    const user = await this.userRepository.validatePassword(signInDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { email: user.email };
    const accessToken =  this.jwtService.sign(payload);
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      contactNumber: user.contactNumber,
      id: user.user_id,
      accessToken,
    };
    
  }
}
