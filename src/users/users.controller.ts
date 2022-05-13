import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { NestResponse } from '../core/http/nestResponse';
import { NestResponseBuilder } from '../core/http/nestResponseBuilder';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':username')
  show(@Param() params): User {
    const user = this.usersService.findByUsername(params.username);

    return user;
  }

  @Post()
  create(@Body() body: User): NestResponse {
    const user = this.usersService.create(body);

    return new NestResponseBuilder()
      .status(HttpStatus.CREATED)
      .headers({ Location: `/users/${user.username}` })
      .body(user)
      .build();
  }
}
