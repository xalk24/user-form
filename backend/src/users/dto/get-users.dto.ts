import { IsNumberString } from 'class-validator';

export class GetUsersDto {
  @IsNumberString()
  page: number;
  @IsNumberString()
  limit: number;
}
