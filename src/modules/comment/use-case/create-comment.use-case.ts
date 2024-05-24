import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from '../dto/create-comment.dto';
import { CreateCommentCommand } from '../command/create-comment/create-comment.command';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CreateCommentUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly httpService: HttpService,
  ) {}

  async createComment(input: CreateCommentInput): Promise<CreateCommentOutput> {
    try {
      const googleUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_KEY}&response=${input.token}`;

      process.env.NODE_ENV === 'prod' &&
        (await this.httpService.axiosRef.get(googleUrl));

      await this.commandBus.execute(new CreateCommentCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
