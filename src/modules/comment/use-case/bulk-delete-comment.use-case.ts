import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  DeleteCommentOutput,
  DeleteCommentsInput,
} from '../dto/delete-comment.dto';
import { BulkDeleteCommentCommand } from '../command/bulk-delete-comment/bulk-delete-comment.command';
import { CommentHelepr } from '../helper/business-helper';

@Injectable()
export class BulkDeleteCommentUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly commentHelepr: CommentHelepr,
  ) {}

  async bulkDeleteComment(
    input: DeleteCommentsInput,
  ): Promise<DeleteCommentOutput> {
    try {
      for (const id of input.commentIds) {
        await this.commentHelepr.validateCommentId(id);
      }
      await this.commandBus.execute(new BulkDeleteCommentCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
