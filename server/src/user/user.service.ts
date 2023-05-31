import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: UserRepository){}

    async createUser(user:CreateUserDto): Promise<User> {
        return await this.userRepository.save(user);
      }

    async showById(id: number){
        const user = await this.findById(id);

        delete user.password;
        return user;
    }

    async findById(id: number): Promise<User>{
        return await this.userRepository.findOneBy({id:id});
    }

    async findByEmail(email: string): Promise<User>{
        return await this.userRepository.findOneBy({email:email});
    }
}
