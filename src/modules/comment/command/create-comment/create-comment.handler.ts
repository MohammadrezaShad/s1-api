import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CommentModelFactory } from '../../model/comment-model.factory';
import { CreateCommentCommand } from './create-comment.command';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(private readonly commentFactory: CommentModelFactory) {}
  async execute(command: CreateCommentCommand) {
    const { createCommentInput } = command;

    await this.commentFactory.create(createCommentInput);
  }
}
