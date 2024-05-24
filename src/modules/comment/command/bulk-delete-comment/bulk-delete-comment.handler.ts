import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BulkDeleteCommentCommand } from './bulk-delete-comment.command';
import { CommentRepository } from '../../comment.repository';

@CommandHandler(BulkDeleteCommentCommand)
export class BulkDeleteCommentHandler
  implements ICommandHandler<BulkDeleteCommentCommand>
{
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: BulkDeleteCommentCommand) {
    const { deleteCommentsInput } = command;

    await this.commentRepository.bulkDelete(deleteCommentsInput.commentIds);
  }
}
