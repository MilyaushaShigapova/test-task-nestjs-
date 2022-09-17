import { ConflictException } from '@nestjs/common';

export class UserEmailExistException extends ConflictException {
  constructor(error?: string) {
    super(
      'Error: userEmailExist. Email is already in use. Choose another Email!',
      error,
    );
  }
}
export class UserNicknameExistException extends ConflictException {
  constructor(error?: string) {
    super(
      'Error: userNicknameExist. Nickname is already in use. Choose another Nickname!',
      error,
    );
  }
}

export class TagNameExistException extends ConflictException {
  constructor(error?: string) {
    super(
      'Error: tagNameExist.Name is already in use. Choose another Name!',
      error,
    );
  }
}
