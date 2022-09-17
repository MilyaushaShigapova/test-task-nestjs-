import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ example: 'TagName' })
  @IsNotEmpty()
  @Length(4, 30)
  name: string;

  @ApiProperty({ example: 0 })
  @IsOptional()
  @IsInt()
  sortOrder: number;
}
