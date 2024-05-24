import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  DeleteCommentInput,
  DeleteCommentOutput,
} from '../dto/delete-comment.dto';
import { DeleteCommentCommand } from '../command/delete-comment/delete-comment.command';
import { CommentHelepr } from '../helper/business-helper';

@Injectable()
export class DeleteCommentUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly commentHelepr: CommentHelepr,
  ) {}

  async deleteComment(input: DeleteCommentInput): Promise<DeleteCommentOutput> {
    try {
      await this.commentHelepr.validateCommentId(input.commentId);
      await this.commandBus.execute(new DeleteCommentCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
