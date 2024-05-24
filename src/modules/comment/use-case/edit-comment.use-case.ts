import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EditCommentInput, EditCommentOutput } from '../dto/edit-comment.dto';
import { EditCommentCommand } from '../command/edit-comment/delete-comment.command';
import { CommentHelepr } from '../helper/business-helper';

@Injectable()
export class EditCommentUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly commentHelepr: CommentHelepr,
  ) {}

  async editComment(input: EditCommentInput): Promise<EditCommentOutput> {
    try {
      await this.commentHelepr.validateCommentId(input.commentId);

      await this.commandBus.execute(new EditCommentCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
