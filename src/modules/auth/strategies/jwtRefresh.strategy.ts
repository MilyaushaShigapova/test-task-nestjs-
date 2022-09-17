import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';
import appConfig from '../../../config/app.config';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwtRefresh',
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: true,
      secretOrKey: appConfig().jwtSecret,
      passReqToCallback: true,
    });
  }
  async validate(req, payload: any) {
    var user = await this.userService.getUserById(payload.user);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (req.body.refresh_token != user.refresh_token) {
      throw new UnauthorizedException();
    }
    if (new Date() > new Date(user.refresh_token_expires)) {
      throw new UnauthorizedException();
    }
    return {
      uid: payload.user,
    };
  }
}
