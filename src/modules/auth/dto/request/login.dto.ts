import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from 'src/app.utils';

export class LoginDto {
  @ApiProperty({ example: 'mail@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @Length(4, 100)
  email: string;

  @ApiProperty({ example: 'Password123' })
  @IsNotEmpty()
  @Length(8, 100)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  password: string;
}
