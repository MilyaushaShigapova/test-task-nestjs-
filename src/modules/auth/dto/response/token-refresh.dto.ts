import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TokenRefreshDto {
  @ApiProperty({ example: '368f17b9-dd43-4f2c-bc61-10374c53fd17' })
  @IsUUID()
  userUid: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYmI3NWJjNjAtMmRkMi00NWFkLWI3YTAtYjNlZWI4M2VhNTAwIiwiaWF0IjoxNjYyOTAxMzEzLCJleHAiOjE2NjI5MDMxMTN9.ypaZlkhBGfk8I-mvahLFU4bUVOB3uCNbKWA0aCxSafw',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @ApiProperty({ example: 1800 })
  @IsInt()
  expire: number;

  constructor(entity) {
    this.userUid = entity.userUid;
    this.refreshToken = entity.refreshToken;
    this.expire = entity.expire;
  }
}
