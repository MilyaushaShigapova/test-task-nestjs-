import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { ToIntArray } from '../../../../common/decorator/toInt.decorator';
export class AddTagDto {
  @ApiProperty({ example: [1, 2] })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ToIntArray()
  @ApiPropertyOptional({ isArray: true, minItems: 1 })
  tags: Array<number>;
}
