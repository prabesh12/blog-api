import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PostModule } from './post/post.module';
// import { PostModule } from './post/post.module';
import { CommentsModule } from './comments/comments.module';




@Global()
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule,PostModule, CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
