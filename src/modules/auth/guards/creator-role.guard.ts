import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { NotCreatorException } from 'src/common/exception/forbidden.exception';
import { TagNotFoundException } from 'src/common/exception/notFound.exception';
import { TagService } from '../../tag/tag.service';

@Injectable()
export class CreatorTagGuard implements CanActivate {
  constructor(private tagService: TagService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request?.user) {
      const tag = await this.tagService.getTagByIdWithCreator(
        request.params.id,
      );
      if (tag) {
        if (tag.creator.uid === request.user.uid) return true;
        else throw new NotCreatorException();
      } else throw new TagNotFoundException();
    }
    throw new UnauthorizedException();
  }
}
