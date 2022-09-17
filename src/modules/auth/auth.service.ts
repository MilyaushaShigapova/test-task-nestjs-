import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/request/signin.dto';
import { UserDto } from '../user/dto/response/user.dto';
import {
  UserEmailExistException,
  UserNicknameExistException,
} from 'src/common/exception/exist.exception';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import appConfig from 'src/config/app.config';
import { TokenDto } from './dto/response/token.dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { UserNotFoundException } from 'src/common/exception/notFound.exception';
import { PasswordException } from 'src/common/exception/forbidden.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Transactional()
  async signin(data: SigninDto): Promise<UserDto> {
    data.nickname = data.nickname.toLowerCase();
    data.email = data.email.toLowerCase();
    const isExistEmail = await this.userService.getUserByEmail(data.email);
    if (!isExistEmail) {
      const isExistNickname = await this.userService.getUserByNickName(
        data.nickname,
      );
      if (!isExistNickname) {
        const userRep = this.userRepository.create(data);
        const user = await this.userRepository.save(userRep);
        return new UserDto(user);
      } else {
        throw new UserNicknameExistException();
      }
    } else {
      throw new UserEmailExistException();
    }
  }
  async validateUserCred(email: string, password: string): Promise<UserDto> {
    email = email.toLowerCase();
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new UserNotFoundException();
    if (!(await bcrypt.compare(password, user.password)))
      throw new PasswordException();
    return new UserDto(user);
  }
  @Transactional()
  async generateToken(user: UserDto): Promise<TokenDto> {
    const token = this.jwtService.sign({
      user: user.uid,
      secret: appConfig().jwtSecret,
      expiresIn: appConfig().jwtExpire,
    });
    const refreshToken = await this.generateRefreshToken(user.uid);
    const tokenPayload = new TokenDto({
      expire: Number(appConfig().jwtExpire),
      token,
      refreshExpire: Number(appConfig().jwtRefreshExpire),
      refreshToken,
    });
    return tokenPayload;
  }

  async logout(user: UserDto): Promise<string> {
    try {
      await this.userService.saveorupdateRefreshToken(null, user.uid, null);
      return 'Успешно!';
    } catch (error) {
      return error;
    }
  }

  async generateRefreshToken(useruId): Promise<string> {
    const refreshToken = this.jwtService.sign({
      user: useruId,
      secret: appConfig().jwtRefreshSecret,
      expiresIn: appConfig().jwtRefreshExpire,
    });
    let expirydate = new Date();
    expirydate.setHours(expirydate.getHours() + 6);
    await this.userService.saveorupdateRefreshToken(
      refreshToken,
      useruId,
      expirydate,
    );
    return refreshToken;
  }
}
