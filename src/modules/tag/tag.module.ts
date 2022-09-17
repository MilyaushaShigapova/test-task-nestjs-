import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from './tag.controller';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag, User]),
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [TagController],
  providers: [TagService, UserService],
  exports: [TypeOrmModule, TagService, JwtModule.registerAsync(jwtConfig)],
})
export class TagModule {}
