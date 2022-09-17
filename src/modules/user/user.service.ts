import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserEmailExistException,
  UserNicknameExistException,
} from 'src/common/exception/exist.exception';
import { TagNotFoundException } from 'src/common/exception/notFound.exception';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { TagService } from '../tag/tag.service';
import { AddTagDto } from './dto/request/addTags.dto';
import { UpdateUserDto } from './dto/request/update.dto';
import { MyTagsDto } from './dto/response/myTags.dto';
import { UpdateUserResponseDto } from './dto/response/updateUser.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private tagService: TagService,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
  async getUserByNickName(nickname: string): Promise<User> {
    return await this.userRepository.findOne({ where: { nickname } });
  }
  async getUserById(uid: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { uid },
      relations: ['tags'],
    });
  }
  @Transactional()
  async update(
    data: UpdateUserDto,
    userUid: string,
  ): Promise<UpdateUserResponseDto> {
    const user = await this.getUserById(userUid);
    if (
      data &&
      (data.email != undefined ||
        data.nickname != undefined ||
        data.password != undefined)
    ) {
      let isExistEmail: User, isExistNickname: User;
      if (data.email) {
        user.email = data.email.toLowerCase();
        isExistEmail = await this.getUserByEmail(data.email.toLowerCase());
      }
      if (data.password) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(data.password, salt);
      }
      if (data.nickname) {
        user.nickname = data.nickname.toLowerCase();
        isExistNickname = await this.getUserByNickName(
          data.nickname.toLowerCase(),
        );
      }
      if (!isExistEmail) {
        if (!isExistNickname) {
          const result = await this.userRepository.save(user);
          return new UpdateUserResponseDto(result);
        } else {
          throw new UserNicknameExistException();
        }
      } else {
        throw new UserEmailExistException();
      }
    } else {
      return new UpdateUserResponseDto(user);
    }
  }

  @Transactional()
  async delete(userUid: string): Promise<string> {
    try {
      await this.userRepository.delete(userUid);
    } catch (error) {
      return error;
    }
    return 'Клиент удален';
  }

  @Transactional()
  async addTag(userUid: string, tag: AddTagDto): Promise<MyTagsDto> {
    const tags = await this.tagService.getTagByIdTags(tag);
    const user = await this.getUserById(userUid);
    tags.forEach((el) => {
      const findTagIdByUser = user.tags.find((i) => i.id == el.id);
      if (!findTagIdByUser) user.tags.push(el);
    });
    const userTags = await this.userRepository.save(user);
    return new MyTagsDto(userTags.tags);
  }

  @Transactional()
  async delTag(userUid: string, tagId: number): Promise<MyTagsDto> {
    const user = await this.getUserById(userUid);
    const findTag = user.tags.findIndex((i) => i.id == tagId);
    if (findTag == -1) {
      throw new TagNotFoundException();
    } else {
      user.tags.splice(findTag, 1);
      const userTags = await this.userRepository.save(user);
      return new MyTagsDto(userTags.tags);
    }
  }
  async userTags(userUid: string): Promise<MyTagsDto> {
    const tags = await this.tagService.getTagByIdUser(userUid);
    return new MyTagsDto(tags);
  }

  @Transactional()
  async saveorupdateRefreshToken(refreshToken: string, id: string, expirydate) {
    await this.userRepository.update(id, {
      refresh_token: refreshToken,
      refresh_token_expires: expirydate,
    });
  }
}
