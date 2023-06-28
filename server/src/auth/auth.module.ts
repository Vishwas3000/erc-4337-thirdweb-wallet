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
        secret:'46fb0d0c4f4044d2381a7e3f8a1535d1697b7a44c066a7eb5c47a6492b6e2682',
      }),
      inject: [ConfigService],
    })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
