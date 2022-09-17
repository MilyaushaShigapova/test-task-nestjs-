import { ForbiddenException } from '@nestjs/common';

export class PasswordException extends ForbiddenException {
  constructor(error?: string) {
    super('Error: incorrectPassword. Password was entered incorrectly.', error);
  }
}
export class RefreshTokenException extends ForbiddenException {
  constructor(error?: string) {
    super('error.refreshToken.incorrect', error);
  }
}

export class NotCreatorException extends ForbiddenException {
  constructor(error?: string) {
    super(
      'Error:CreatorTagGuardRole.You dont have the rights to delete the tag',
      error,
    );
  }
}
