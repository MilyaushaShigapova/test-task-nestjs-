import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/modules/user/dto/response/user.dto';
import { Tag } from '../../tag.entity';
import { TagDto } from './tag.dto';

export class TagWithCreatorDto extends TagDto {
  @ApiProperty({ type: UserDto })
  readonly creator: UserDto;

  constructor(entity: Tag) {
    super(entity);
    this.creator = {
      nickname: entity.creator.nickname,
      uid: entity.creator.uid,
    };
  }
}
