import { IsDateString, IsDefined, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  family: string;
  @IsDefined()
  @IsDateString()
  birthday: Date;
  @IsNotEmpty()
  name: string;
}
