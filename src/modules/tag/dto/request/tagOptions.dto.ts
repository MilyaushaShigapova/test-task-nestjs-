import { Injectable } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { OrderType } from 'src/common/constatnts/order.type';
import { SortTag } from 'src/common/constatnts/sort.type';

@Injectable()
export class TagOptionsDto {
  @IsOptional()
  @Min(1)
  @Max(1000)
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 1000, default: 5 })
  readonly limit: number = 5;

  @IsOptional()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ type: 'integer', minimum: 1, default: 1 })
  readonly page: number = 1;

  @IsOptional()
  @IsEnum(OrderType)
  @ApiProperty({ default: OrderType.ASC })
  @ApiPropertyOptional({ enum: OrderType })
  readonly order: OrderType = OrderType.ASC;

  @IsOptional()
  @IsEnum(SortTag)
  @ApiProperty({ type: SortTag, default: SortTag.id })
  @ApiPropertyOptional({ enum: SortTag })
  readonly sort: SortTag = SortTag.id;
}
