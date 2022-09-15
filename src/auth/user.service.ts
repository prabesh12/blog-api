import {
  ConflictException,Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { MongoRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>
  ) {}
  async signUp( signUpDto: SignUpDto): Promise<User> {
    const { firstName, lastName, email, contactNumber, password,userName } = signUpDto;
    const user = new User();
    user.user_id = v4();
    user.firstName = firstName;
    user.lastName = lastName;
    user.userName=userName;
    user.email = email;
    user.contactNumber = contactNumber;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
       await this.userRepository.save(user);
       return user
    } catch (error) {
        throw new ConflictException('Username already exists');
    }
  }

  async validatePassword(signInDto: SignInDto): Promise<User> {
    const {email, password } = signInDto;
    const user = await this.userRepository.findOne({where:{email:email}});
    console.log(user);

    return user && (await user.validatePassword(password)) ? user : null;
  }
 
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }


  // deleteOne(id:number): Promise<any> {
  //     return this.userRepository.deleteOne({id})
  // }
 
  // updateOne(id:number, signUpDTO: SignUpDto) {

  //   return this.userRepository.updateOne({id}, signUpDTO);
  // }
}
