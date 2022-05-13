import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'JD',
      email: 'john.doe@example.com',
      password: '123',
      name: 'john doe',
      createdAt: new Date(),
    },
  ];

  findByUsername(username: string): User {
    const user = this.users.find((u) => u.username === username);

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['User not found'],
      });
    }

    return user;
  }

  create(data: User): User {
    this.users.push(data);

    return data;
  }
}
