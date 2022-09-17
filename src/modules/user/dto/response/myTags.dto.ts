import { ApiProperty } from '@nestjs/swagger';
import { TagDto } from 'src/modules/tag/dto/response/tag.dto';
import { Tag } from 'src/modules/tag/tag.entity';

export class MyTagsDto {
  @ApiProperty({
    type: TagDto,
    isArray: true,
  })
  tags: TagDto[];

  constructor(entity: Tag[]) {
    this.tags = entity.map((it) => new TagDto(it));
  }
}
