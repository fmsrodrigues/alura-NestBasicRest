import { Module } from '@nestjs/common';
import { IsUsernameUniqueConstraint } from './isUsernameUnique.validator';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsUsernameUniqueConstraint],
})
export class UsersModule {}
