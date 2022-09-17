import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../config/jwt.config';
import { TagService } from '../tag/tag.service';
import { Tag } from '../tag/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tag]),
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [UserController],
  providers: [UserService, TagService],
  exports: [TypeOrmModule, UserService, JwtModule.registerAsync(jwtConfig)],
})
export class UserModule {}
