import { IsNotEmpty } from 'class-validator';

export class LinkUserImageDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;
}
