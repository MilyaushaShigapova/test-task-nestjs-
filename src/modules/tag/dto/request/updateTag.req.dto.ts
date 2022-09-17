import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Length } from 'class-validator';

export class UpdateTagDto {
  @ApiProperty({ example: 'TagName' })
  @IsOptional()
  @Length(4, 30)
  name: string;

  @ApiProperty({ example: 0 })
  @IsOptional()
  @IsInt()
  sortOrder: number;
}
