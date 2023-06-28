import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

    async createUser(userDto:CreateUserDto){

        try{
            userDto.password = await this.hashPassword(userDto.password);
            
            const newUser = new this.userModel({email: userDto.email, password: userDto.password})
            await newUser.save();
            
            delete newUser.password;
    
            return newUser;

        }catch(err){
            if(err.code === '23505'){
                const existingUser = await this.getUserByMail(userDto.email);
                delete existingUser.password;

                return {msg: 'User already exists', user: existingUser}
            }else{
                throw err;
            }
        }

      }

    async showById(id: number){
        const user = await this.findById(id);

        delete user.password;
        return user;
    }

    async getUserByMail(email: string): Promise<UserDocument>{
        const user = await this.userModel.findOne({email:email}).exec();
        return user;
    }

    async getUserById(id: number):Promise<UserDocument>{
        const user = await this.userModel.findById(id).exec();
        return user;
    }

    async findById(id: number): Promise<UserDocument>{
        return await this.userModel.findOne ({id:id});
    }

    async findByEmail(email: string): Promise<UserDocument>{
        return await this.userModel.findOne({email:email});
    }

    async hashPassword(password: string): Promise<string>{
        return await bcrypt.hash(password, 8);
    }
}
