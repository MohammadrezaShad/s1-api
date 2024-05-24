import { UpdateCommentInput } from '../../dto/update-comment.dto';

export class UpdateCommentCommand {
  constructor(public readonly updateCommentInput: UpdateCommentInput) {}
}
