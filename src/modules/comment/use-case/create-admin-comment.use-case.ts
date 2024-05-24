import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  CreateAdminCommentInput,
  CreateCommentOutput,
} from '../dto/create-comment.dto';
import { HttpService } from '@nestjs/axios';
import { CreateAdminCommentCommand } from '../command/create-admin-comment/create-comment.command';

@Injectable()
export class CreateAdminCommentUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly httpService: HttpService,
  ) {}

  async createAdminComment(
    input: CreateAdminCommentInput,
  ): Promise<CreateCommentOutput> {
    try {
      const googleUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_KEY}&response=${input.token}`;

      process.env.NODE_ENV === 'prod' &&
        (await this.httpService.axiosRef.get(googleUrl));

      await this.commandBus.execute(new CreateAdminCommentCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
