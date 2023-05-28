import { IsDateString, IsNotEmpty } from 'class-validator';

export class EditUserDto {
  @IsNotEmpty()
  family: string;
  @IsDateString()
  birthday: Date;
  @IsNotEmpty()
  name: string;
}
