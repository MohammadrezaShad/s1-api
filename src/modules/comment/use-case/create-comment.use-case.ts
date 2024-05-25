import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from '../dto/create-comment.dto';
import { CreateCommentCommand } from '../command/create-comment/create-comment.command';

@Injectable()
export class CreateCommentUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async createComment(input: CreateCommentInput): Promise<CreateCommentOutput> {
    try {
      await this.commandBus.execute(new CreateCommentCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
