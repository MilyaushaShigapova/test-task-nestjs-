import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';
import { RefreshTokenDto } from './dto/request/refresh-token.dto';
import { SigninDto } from './dto/request/signin.dto';
import { TokenDto } from './dto/response/token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ description: 'User created', type: TokenDto })
  @ApiOperation({ summary: 'Зарегистрироваться' })
  async signin(@Body() data: SigninDto): Promise<TokenDto> {
    const user = await this.authService.signin(data);
    const token = await this.authService.generateToken(user);
    return token;
  }

  @Post('/login')
  @ApiOkResponse({ description: 'Login completed', type: TokenDto })
  @ApiOperation({ summary: 'Войти' })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any, @Body() data: LoginDto): Promise<TokenDto> {
    return await this.authService.generateToken(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh-token')
  @ApiOkResponse({ description: 'Token Refresh', type: TokenDto })
  @ApiOperation({ summary: 'Обновить токен' })
  async refreshToken(@Request() req, @Body() token: RefreshTokenDto) {
    return await this.authService.generateToken(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @ApiOkResponse({ description: 'Logged out', type: TokenDto })
  @ApiOperation({ summary: 'Выйти' })
  async logout(@Request() req: any): Promise<string> {
    const logout = this.authService.logout(req.user);
    return logout;
  }
}
