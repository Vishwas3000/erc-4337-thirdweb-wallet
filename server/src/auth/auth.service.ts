import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
    constructor(private usersService:UserService, private jwtService:JwtService){}

    async login(authLoginDto: AuthLoginDto) {
      console.log("auth: ",authLoginDto)
        const user = await this.validateUser(authLoginDto);
    
        const payload = {
          userId: user.id,
        };
    
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    
      async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
        const { email, password } = authLoginDto;
        
        const user = await this.usersService.findByEmail(email);
        if (!(await user?.validatePassword(password))) {
          throw new UnauthorizedException();
        }
    
        return user;
      }
}