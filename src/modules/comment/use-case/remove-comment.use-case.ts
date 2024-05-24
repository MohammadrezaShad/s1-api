import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  DeleteCommentOutput,
  RemoveCommentInput,
} from '../dto/delete-comment.dto';
import { RemoveCommentCommand } from '../command/remove-comment/remove-comment.command';
import { CommentHelepr } from '../helper/business-helper';

@Injectable()
export class RemoveCommentUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly commentHelepr: CommentHelepr,
  ) {}

  async removeComment(input: RemoveCommentInput): Promise<DeleteCommentOutput> {
    try {
      await this.commentHelepr.validateCommentId(input.commentId);

      await this.commandBus.execute(new RemoveCommentCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
