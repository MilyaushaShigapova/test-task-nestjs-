import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { User } from '../../user.entity';

export class UpdateUserResponseDto {
  @ApiProperty({ example: 'mail@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @Length(4, 100)
  email: string;

  @ApiProperty({ example: 'NickName' })
  @IsNotEmpty()
  @Length(4, 30)
  @IsString()
  nickname: string;

  constructor(entity: User) {
    this.nickname = entity.nickname;
    this.email = entity.email;
  }
}
