import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID, Length } from 'class-validator';
import { User } from '../../user.entity';

export class UserDto {
  @ApiProperty({ example: '368f17b9-dd43-4f2c-bc61-10374c53fd17' })
  @IsUUID()
  uid: string;

  @ApiProperty({ example: 'NickName' })
  @IsNotEmpty()
  @Length(4, 30)
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'mail@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @Length(4, 100)
  email?: string;

  constructor(entity: User) {
    this.uid = entity.uid;
    this.nickname = entity.nickname;
    this.email = entity.email;
  }
}
