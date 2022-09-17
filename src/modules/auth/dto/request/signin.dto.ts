//ИСПОЛЬЗУЕТСЯ ВСЕ
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsString } from 'class-validator';
import { LoginDto } from './login.dto';

export class SigninDto extends LoginDto {
  @ApiProperty({ example: 'NickName' })
  @IsNotEmpty()
  @Length(4, 30)
  @IsString()
  nickname: string;
}
