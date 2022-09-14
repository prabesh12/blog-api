import {
  BaseEntity,
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
@Entity()
export class Post extends BaseEntity {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn()
  id: string;
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  user_id: string;

  @Column()
  date_posted: string;

  @Column()
  img: string;
}
