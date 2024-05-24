import { DeleteCommentInput } from '../../dto/delete-comment.dto';

export class DeleteCommentCommand {
  constructor(public readonly deleteCommentInput: DeleteCommentInput) {}
}
