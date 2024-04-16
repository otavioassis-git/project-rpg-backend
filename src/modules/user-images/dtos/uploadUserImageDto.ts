import { IsNotEmpty } from 'class-validator';

export class UploadUserImageDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  value: string;
}
