import { Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comments {
  @ObjectIdColumn()
  _id: string;
  @PrimaryGeneratedColumn()
  comment_id: string;
  post_id: string;
  comment: string;
  user_name: string;
  user_id: string;
}
