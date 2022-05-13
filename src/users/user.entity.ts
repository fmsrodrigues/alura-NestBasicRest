import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUsernameUnique } from './isUsernameUnique.validator';

export class User {
  id: number;

  @IsUsernameUnique({
    message: 'username must be unique',
  })
  @IsNotEmpty({
    message: 'username is required',
  })
  @IsString()
  username: string;

  @IsNotEmpty({
    message: 'email is required',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'password is required',
  })
  @IsString()
  // @Expose({
  //   name: 'password', change the name exposed to the consumers
  // })
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @IsNotEmpty({
    message: 'name is required',
  })
  @IsString()
  name: string;

  // @Expose({
  //   name: 'createdAt',
  // })
  createdAt: Date;
}
