import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwtRefresh.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.registerAsync(jwtConfig),
    PassportModule.register({ defaultStrategy: ['jwt', 'jwtRefresh'] }),
    PassportModule,
  ],
  exports: [
    PassportModule.register({
      defaultStrategy: ['jwt', 'jwtRefresh'],
    }),
  ],
})
export class AuthModule {}
