import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDto } from 'src/modules/user/dto/response/user.dto';
import { User } from '../../user/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserDto> {
    const user: UserDto = await this.authService.validateUserCred(
      email,
      password,
    );
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
