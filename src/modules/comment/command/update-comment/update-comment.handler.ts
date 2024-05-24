import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCommentCommand } from './update-comment.command';
import { CommentRepository } from '../../comment.repository';

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler
  implements ICommandHandler<UpdateCommentCommand>
{
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: UpdateCommentCommand) {
    const { updateCommentInput } = command;
    await this.commentRepository.update(updateCommentInput);
  }
}
