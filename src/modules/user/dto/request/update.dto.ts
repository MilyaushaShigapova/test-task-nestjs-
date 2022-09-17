import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { MESSAGES, REGEX } from 'src/app.utils';

export class UpdateUserDto {
  @ApiProperty({ example: 'mail@gmail.com' })
  @IsOptional()
  @IsEmail()
  @Length(4, 100)
  email: string;

  @ApiProperty({ example: 'Password123' })
  @IsOptional()
  @Length(8, 100)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  password: string;

  @ApiProperty({ example: 'NickName' })
  @IsOptional()
  @Length(4, 30)
  @IsString()
  nickname: string;
}
