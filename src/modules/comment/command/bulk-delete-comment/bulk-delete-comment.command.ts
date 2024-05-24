import { DeleteCommentsInput } from '../../dto/delete-comment.dto';

export class BulkDeleteCommentCommand {
  constructor(public readonly deleteCommentsInput: DeleteCommentsInput) {}
}
