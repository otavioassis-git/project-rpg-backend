import { IsEmpty, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  newPassword: string;
}
