import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { JwtStrategy } from './jwt-strategy';
import { UserService } from './user.service';

@Module({
  imports: [

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'blog',
      signOptions: {
        expiresIn: 3600,
      },
    }),
     TypeOrmModule.forFeature([User])
  ],
  providers: [UserService,AuthService, JwtStrategy, {provide:"UserServiceRepository", useClass: UserService}],
  controllers: [AuthController],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
