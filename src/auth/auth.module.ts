import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/post/entities/post.entity';
import { PostService } from 'src/post/post.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { JwtStrategy } from './jwt-strategy';
import { PostRepository } from 'src/post/post.repository';
import { UserService } from './user.service';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [
    PostModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'blog',
      signOptions: {
        expiresIn: 3600,
      },
    }),
     TypeOrmModule.forFeature([User, Posts])
  ],
  providers: [UserService,AuthService, JwtStrategy, {provide:"UserServiceRepository", useClass: UserService}],
  controllers: [AuthController],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
