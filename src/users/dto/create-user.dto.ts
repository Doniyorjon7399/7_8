import { isNumber, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsNumber()
  age: number;
  @IsNumber()
  balance: number;
}
