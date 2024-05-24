import { CreateCommentInput } from '../../dto/create-comment.dto';

export class CreateCommentCommand {
  constructor(public readonly createCommentInput: CreateCommentInput) {}
}
