import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  UpdateCommentInput,
  UpdateCommentOutput,
} from '../dto/update-comment.dto';
import { UpdateCommentCommand } from '../command/update-comment/update-comment.command';
import { CommentHelepr } from '../helper/business-helper';

@Injectable()
export class UpdateCommentUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly commentHelepr: CommentHelepr,
  ) {}

  async updateComment(input: UpdateCommentInput): Promise<UpdateCommentOutput> {
    try {
      await this.commentHelepr.validateCommentId(input.commentId);

      await this.commandBus.execute(new UpdateCommentCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
