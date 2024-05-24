import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateAdminCommentCommand } from './create-comment.command';
import { CommentRepository } from '../../comment.repository';

@CommandHandler(CreateAdminCommentCommand)
export class CreateAdminCommentHandler
  implements ICommandHandler<CreateAdminCommentCommand>
{
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: CreateAdminCommentCommand) {
    const { createAdminCommentInput } = command;

    await this.commentRepository.createAdminComment(createAdminCommentInput);
  }
}
