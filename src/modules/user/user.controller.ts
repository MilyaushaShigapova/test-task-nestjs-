import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUserInfoDto } from './dto/request/getUserInfo.dto';
import { UpdateUserDto } from './dto/request/update.dto';
import { UserService } from './user.service';
import { UpdateUserResponseDto } from './dto/response/updateUser.dto';
import { AddTagDto } from './dto/request/addTags.dto';
import { MyTagsDto } from './dto/response/myTags.dto';
import { ParamsIntDto } from 'src/common/dto/params.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiTags('User')
  @ApiOkResponse({ description: 'User Profile', type: GetUserInfoDto })
  @ApiOperation({ summary: 'Посмотреть информацию о пользователе' })
  @Get('')
  async user(@Request() req: any): Promise<GetUserInfoDto> {
    const ptofileUser = await this.userService.getUserById(req.user.uid);
    return new GetUserInfoDto(ptofileUser);
  }

  @ApiTags('User')
  @ApiOkResponse({ description: 'User update', type: UpdateUserResponseDto })
  @ApiOperation({ summary: 'Редактирование пользователя' })
  @Put('')
  async update(
    @Request() req: any,
    @Body() data: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    return await this.userService.update(data, req.user.uid);
  }

  @ApiTags('User')
  @Delete('')
  @ApiOkResponse({ description: 'User delete', type: String })
  @ApiOperation({ summary: 'Удалить пользователя' })
  async delete(@Request() req: any): Promise<string> {
    return await this.userService.delete(req.user.uid);
  }

  @Post('/tag')
  @ApiTags('UserTag')
  @ApiOkResponse({ description: 'Tags add', type: MyTagsDto })
  @ApiOperation({ summary: 'Добавить теги пользователю' })
  async addTags(
    @Request() req: any,
    @Body() data: AddTagDto,
  ): Promise<MyTagsDto> {
    return await this.userService.addTag(req.user.uid, data);
  }

  @Delete('/tag/:id')
  @ApiTags('UserTag')
  @ApiOkResponse({ description: 'Tag deleted', type: MyTagsDto })
  @ApiOperation({ summary: 'Удалить тег у пользователя' })
  async deleteTag(
    @Request() req: any,
    @Param() params: ParamsIntDto,
  ): Promise<MyTagsDto> {
    return await this.userService.delTag(req.user.uid, params.id);
  }

  @ApiTags('UserTag')
  @ApiOkResponse({ description: 'Tag created', type: MyTagsDto })
  @ApiOperation({ summary: 'Получить список созданных тегов' })
  @Get('tag/my')
  async userTags(@Request() req: any): Promise<MyTagsDto> {
    return await this.userService.userTags(req.user.uid);
  }
}
