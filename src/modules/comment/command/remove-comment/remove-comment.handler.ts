import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommentRepository } from '../../comment.repository';
import { RemoveCommentCommand } from './remove-comment.command';

@CommandHandler(RemoveCommentCommand)
export class RemoveCommentHandler
  implements ICommandHandler<RemoveCommentCommand>
{
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: RemoveCommentCommand) {
    const { removeCommentInput } = command;
    await this.commentRepository.removeComment(removeCommentInput);
  }
}
