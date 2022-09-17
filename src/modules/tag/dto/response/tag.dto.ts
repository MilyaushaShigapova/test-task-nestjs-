import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Length } from 'class-validator';
import { Tag } from '../../tag.entity';

export class TagDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'TagName' })
  @IsNotEmpty()
  @Length(4, 30)
  name: string;

  @ApiProperty({ example: 0 })
  @IsInt()
  sortOrder: number;

  constructor(entity: Tag) {
    this.id = entity.id;
    this.name = entity.name;
    this.sortOrder = entity.sortOrder;
  }
}
