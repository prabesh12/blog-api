import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'blog',
    });
  }
 
  async validate(payload: JwtPayload): Promise<User>{
    const { email } = payload;
    const user = await this.userRepository.findOne({ where: {
      email: email
  } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
