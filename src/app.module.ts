import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
// import { PostModule } from './post/post.module';




@Global()
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
