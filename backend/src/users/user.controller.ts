import { Controller, Get, Body, Put, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './user.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Post('auth')
  async auth(@Body() body: { fullName: string }) {
    return this.userService.auth(body);
  }

  @Post()
  async create(@Body() body: UpdateUserDto) {
    return this.userService.create(body);
  }
}
