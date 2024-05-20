// user-registration.use-case.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { SigninOutput } from '@/modules/auth/dto/signin.dto';
import { SigninWithGoogleQuery } from '@/modules/auth/query/signin-with-google/signin-with-google.query';

@Injectable()
export class SigninWithGoogleUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async signinWithGoogle(user: any, res: any): Promise<SigninOutput> {
    try {
      if (!user) {
        throw new BadRequestException('Unauthenticated');
      }

      const userTokens = await this.queryBus.execute(
        new SigninWithGoogleQuery(user),
      );
      res.redirect(
        `${process.env.GOOGLE_FRONT_CALLBACK_URL}?accessToken=${userTokens.accessToken}&refreshToken=${userTokens.refreshToken}`,
      );
      return {
        success: true,
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
