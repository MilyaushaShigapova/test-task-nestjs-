import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ParamsIntDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1, {})
  @ApiProperty({
    minimum: 1,
  })
  readonly id: number;
}
