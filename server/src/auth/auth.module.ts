import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [

    UserModule, 
    PassportModule, 
    JwtModule.registerAsync({
      imports:[ConfigModule], 
      useFactory: async()=>({
        secret: process.env.JWT_SECRET_KEY,
      }),
      inject: [ConfigService],
    })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
