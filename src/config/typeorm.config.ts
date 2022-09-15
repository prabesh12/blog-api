import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb+srv://blog:blog@cluster0.wbotyz4.mongodb.net/blog?retryWrites=true&w=majority',
  synchronize: true,
  useUnifiedTopology: true,
  /*
    https://stackoverflow.com/a/61993425/2611620
    When the app is started, TS code is transpiled into JS and thus TypeORM config is also transpiled into JS
    and TypeORM cannot read it unless you set entities to read both JS and TS files. The {js,ts} syntax used
    here simply means to read any file with js or ts suffix
  */
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
