import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  CreateAdminCommentInput,
  CreateCommentOutput,
} from '../dto/create-comment.dto';
import { CreateAdminCommentCommand } from '../command/create-admin-comment/create-comment.command';

@Injectable()
export class CreateAdminCommentUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async createAdminComment(
    input: CreateAdminCommentInput,
  ): Promise<CreateCommentOutput> {
    try {
      await this.commandBus.execute(new CreateAdminCommentCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
