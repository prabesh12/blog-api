import {
  BaseEntity,
  Column,
  Entity,
  ObjectIdColumn,
  OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Post } from 'src/post/entities/post.entity';
@Entity()
@Unique(['email', 'contactNumber'])
export class User extends BaseEntity {
  
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  user_id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  contactNumber: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<Boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
  // @OneToMany(()=>Post, post=>post.user,{onDelete:"CASCADE"})
  // posts: Post[]
}
