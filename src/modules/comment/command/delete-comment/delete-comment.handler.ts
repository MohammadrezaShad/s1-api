import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCommentCommand } from './delete-comment.command';
import { CommentRepository } from '../../comment.repository';

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler
  implements ICommandHandler<DeleteCommentCommand>
{
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: DeleteCommentCommand) {
    const { deleteCommentInput } = command;
    await this.commentRepository.delete(deleteCommentInput.commentId);
  }
}
