import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User, UserDocument } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
    constructor(private usersService:UserService, private jwtService:JwtService){}

    async login(authLoginDto: AuthLoginDto) {
        const user = (await this.validateUser(authLoginDto)).toObject();
    
        const payload = {
          userId: user._id,
        };
    
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    
      async validateUser(authLoginDto: AuthLoginDto): Promise<UserDocument> {
        const { email, password } = authLoginDto;
        
        const user = await this.usersService.getUserByMail(email);
        if (user && (await user.validatePassword(password))) {
          return user.toObject();
        }else{
          throw new UnauthorizedException('Invalid credentials');
        }
      }
}