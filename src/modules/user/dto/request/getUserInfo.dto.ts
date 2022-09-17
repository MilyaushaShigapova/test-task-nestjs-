import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsString, IsEmail } from 'class-validator';
import { TagDto } from 'src/modules/tag/dto/response/tag.dto';
import { User } from '../../user.entity';

export class GetUserInfoDto {
  @ApiProperty({ example: 'NickName' })
  @IsNotEmpty()
  @Length(4, 30)
  @IsString()
  nickname?: string;

  @ApiProperty({ example: 'mail@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @Length(4, 100)
  email: string;

  @ApiProperty({ type: TagDto, isArray: true })
  tags: TagDto[];

  constructor(entity: User) {
    this.nickname = entity.nickname;
    this.email = entity.email;
    this.tags = entity.tags;
  }
}
