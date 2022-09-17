import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Query,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTagDto } from './dto/request/createTag.dto';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { CreatorTagGuard } from '../auth/guards/creator-role.guard';
import { UpdateTagDto } from './dto/request/updateTag.req.dto';
import { TagDto } from './dto/response/tag.dto';
import { ParamsIntDto } from 'src/common/dto/params.dto';
import { TagWithCreatorDto } from './dto/response/tagWithCreatordto';
import { TagOptionsDto } from './dto/request/tagOptions.dto';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/common/decorator/api-pagination.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Post()
  @ApiOkResponse({ description: 'Tag created', type: TagDto })
  @ApiOperation({ summary: 'Создать тег' })
  async create(
    @Request() req: any,
    @Body() tag: CreateTagDto,
  ): Promise<TagDto> {
    return await this.tagService.create(req.user.uid, tag);
  }

  @ApiPaginatedResponse({ model: Tag, description: 'Tag list' })
  @ApiOperation({ summary: 'Просмотр всех Тегов' })
  @Get()
  async getTags(
    @Query() pageOptionsDto: TagOptionsDto,
  ): Promise<Pagination<Tag>> {
    return await this.tagService.paginate(pageOptionsDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Tag', type: TagWithCreatorDto })
  @ApiOperation({ summary: 'Просмотр Тега по Id' })
  async tagId(@Param() params: ParamsIntDto): Promise<TagWithCreatorDto> {
    return await this.tagService.getTagByIdWithCreator(params.id);
  }

  @Put(':id')
  @UseGuards(CreatorTagGuard)
  @ApiOkResponse({ description: 'Tag Updated', type: TagWithCreatorDto })
  @ApiOperation({ summary: 'Изменить тег' })
  async update(
    @Body() tag: UpdateTagDto,
    @Param() params: ParamsIntDto,
  ): Promise<TagWithCreatorDto> {
    console.log(params);
    return await this.tagService.update(params.id, tag);
  }

  @Delete(':id')
  @UseGuards(CreatorTagGuard)
  @ApiOkResponse({ description: 'Tag Deleted', type: String })
  @ApiOperation({ summary: 'Удалить тег' })
  async userDelete(@Param() params: ParamsIntDto): Promise<string> {
    return await this.tagService.delete(params);
  }
}
