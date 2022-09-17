import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { LoginDto } from 'src/modules/auth/dto/request/login.dto';

export class SigninRequestDto extends LoginDto {
  @ApiProperty({
    description: 'Nickname пользователя(уникальный)',
    example: 'NickName',
  })
  @IsNotEmpty()
  @Length(4, 30)
  nickname: string;
}
