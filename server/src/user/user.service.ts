import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: UserRepository){}

    async createUser(user:CreateUserDto): Promise<User> {

        user.password = await this.hashPassword(user.password);
        const newUser = await this.userRepository.save(user);
        delete newUser.password;

        return newUser;
      }

    async showById(id: number){
        const user = await this.findById(id);

        delete user.password;
        return user;
    }

    async getUserByMail(email: string): Promise<User>{
        const user = await this.userRepository.findOne({where:{email:email}, relations:{wallets:true}});
        return user;
    }

    async getUserById(id: number): Promise<User>{
        const user = await this.userRepository.findOne({where:{id:id}, relations:{wallets:true}});
        return user;
    }

    async findById(id: number): Promise<User>{
        return await this.userRepository.findOneBy({id:id});
    }

    async findByEmail(email: string): Promise<User>{
        return await this.userRepository.findOneBy({email:email});
    }

    async hashPassword(password: string): Promise<string>{
        return await bcrypt.hash(password, 8);
    }
}
