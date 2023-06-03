import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createUser(@Body() userData: CreateUserDto) {
    return await this.userService.createUser(userData);
  }

  @Get(':id')
  showById(@Param('id') id: number) {
    return this.userService.showById(id);
  }
}
