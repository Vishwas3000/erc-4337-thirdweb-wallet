import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [UserController],
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
