import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmpty()
  id: number;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
