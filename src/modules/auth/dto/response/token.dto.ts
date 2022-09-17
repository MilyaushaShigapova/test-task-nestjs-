import { IsInt, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({ example: 1800 })
  @IsInt()
  expire: number;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYmI3NWJjNjAtMmRkMi00NWFkLWI3YTAtYjNlZWI4M2VhNTAwIiwiaWF0IjoxNjYyOTAxMzEzLCJleHAiOjE2NjI5MDMxMTN9.ypaZlkhBGfk8I-mvahLFU4bUVOB3uCNbKWA0aCxSafw',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 21600 })
  @IsInt()
  refreshExpire: number;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYmI3NWJjNjAtMmRkMi00NWFkLWI3YTAtYjNlZWI4M2VhNTAwIiwiaWF0IjoxNjYyOTAxMzEzLCJleHAiOjE2NjI5MDMxMTN9.ypaZlkhBGfk8I-mvahLFU4bUVOB3uCNbKWA0aCxSafw',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  constructor(data: {
    expire: number;
    refreshExpire: number;
    token: string;
    refreshToken: string;
  }) {
    this.expire = data.expire;
    this.token = data.token;
    this.refreshExpire = data.refreshExpire;
    this.refreshToken = data.refreshToken;
  }
}
