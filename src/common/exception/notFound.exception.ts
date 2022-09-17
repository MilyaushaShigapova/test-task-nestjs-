import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('Error: userNotFound. User is not found!', error);
  }
}
export class TagNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('Error: tagNotFound. Tag is not found!', error);
  }
}
