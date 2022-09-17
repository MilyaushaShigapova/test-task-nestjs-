import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';
import appConfig from '../../../config/app.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig().jwtSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const uid = payload.user;
    const user = await this.userRepository.findOne({ uid });
    if (!user.refresh_token) {
      throw new UnauthorizedException();
    }
    return {
      uid: payload.user,
    };
  }
}
