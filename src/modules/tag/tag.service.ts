import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/request/createTag.dto';
import { UpdateTagDto } from './dto/request/updateTag.req.dto';
import { Tag } from './tag.entity';
import { createTagI } from './dto/tag.interface';
import { TagDto } from './dto/response/tag.dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { TagNameExistException } from 'src/common/exception/exist.exception';
import { ParamsIntDto } from 'src/common/dto/params.dto';
import { TagWithCreatorDto } from './dto/response/tagWithCreatordto';
import { TagOptionsDto } from './dto/request/tagOptions.dto';
import { TagNotFoundException } from 'src/common/exception/notFound.exception';
import { AddTagDto } from '../user/dto/request/addTags.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  @Transactional()
  async create(userUid: string, tag: CreateTagDto): Promise<TagDto> {
    let tagAdd: createTagI = {
      name: tag.name.toLowerCase(),
      sortOrder: 0,
      creator: {
        uid: userUid,
      },
    };
    if (tag.sortOrder) tagAdd.sortOrder = tag.sortOrder;
    const findTagName = await this.geTagByName(tagAdd.name);
    if (!findTagName) {
      const tagR = this.tagRepository.create(tagAdd);
      const tagSave = await this.tagRepository.save(tagR);
      return new TagDto(tagSave);
    } else {
      throw new TagNameExistException();
    }
  }

  async geTagByName(name: string): Promise<Tag | undefined> {
    return await this.tagRepository.findOne({ where: { name } });
  }

  async getTagByIdWithCreator(id: number): Promise<TagWithCreatorDto> {
    console.log(id);
    const tag = await this.tagRepository.findOne({
      where: { id },
      relations: ['creator'],
    });
    if (!tag) {
      throw new TagNotFoundException();
    } else return new TagWithCreatorDto(tag);
  }

  async paginate(options: TagOptionsDto): Promise<Pagination<Tag>> {
    console.log(options);
    const qb = this.tagRepository
      .createQueryBuilder('tag')
      .select(['creator.nickname', 'creator.uid', 'tag.name', 'tag.sortOrder'])
      .leftJoin('tag.creator', 'creator');
    qb.orderBy(`${qb.alias}.${options.sort}`, options.order);
    return paginate<Tag>(qb, options);
  }
  @Transactional()
  async delete(params: ParamsIntDto): Promise<string> {
    try {
      const tag = await this.getTagByIdTag(params.id);
      await this.tagRepository.remove(tag);
    } catch (error) {
      return error;
    }
    return 'Tag Удален';
  }

  async getTagByIdTag(id: number): Promise<Tag | undefined> {
    const tag = await this.tagRepository.findOne({
      where: { id },
    });
    return tag;
  }
  async getTagByIdUser(creator: string): Promise<any | undefined> {
    const tag = await this.tagRepository.find({
      relations: ['creator'],
      where: { creator },
    });
    return tag;
  }
  async getTagByIdTags(id: AddTagDto): Promise<Tag[] | any> {
    const lengthArr = id.tags.length;
    const tag = await this.tagRepository
      .createQueryBuilder()
      .where('id = ANY (:id)', { id: id.tags })
      .getMany();
    if (tag.length == lengthArr) return tag;
    else {
      throw new HttpException('Id not founded', HttpStatus.NOT_FOUND);
    }
  }
  @Transactional()
  async update(
    id: number,
    updateData: UpdateTagDto,
  ): Promise<TagWithCreatorDto> {
    console.log(id);
    let tag = await this.getTagByIdWithCreator(id);
    if (tag) {
      if (updateData.sortOrder) tag.sortOrder = updateData.sortOrder;
      if (updateData.name) {
        const findTagName = await this.geTagByName(
          updateData.name.toLowerCase(),
        );
        if (!findTagName) {
          tag.name = updateData.name.toLowerCase();
          const tagSave = await this.tagRepository.save(tag);
          console.log(tagSave);
          return new TagWithCreatorDto(tagSave);
        } else {
          throw new TagNameExistException();
        }
      }
    } else throw new TagNotFoundException();
  }
}
