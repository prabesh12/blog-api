import {
  BaseEntity,
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
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
}
