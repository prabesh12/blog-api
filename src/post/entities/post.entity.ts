import { User } from 'src/auth/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';
@Entity()
export class Post extends BaseEntity {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn()
  post_id: string;
  @Column()
  title: string;

  @Column()
  description: string;
   
  @Column()
  user_name:String;

  @Column()
  user_id: string;

  @Column()


  @Column()
  date_posted: string;

  @Column()
  img: string;

  // @ManyToOne(()=>User, user=>user.posts, {onDelete:"DEFAULT"})
  // user: User;
}
