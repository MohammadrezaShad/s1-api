import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommentRepository } from '../../comment.repository';
import { EditCommentCommand } from './delete-comment.command';

@CommandHandler(EditCommentCommand)
export class EditCommentHandler implements ICommandHandler<EditCommentCommand> {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: EditCommentCommand) {
    const { editCommentInput } = command;
    await this.commentRepository.edit(editCommentInput);
  }
}
