import { RemoveCommentInput } from '../../dto/delete-comment.dto';

export class RemoveCommentCommand {
  constructor(public readonly removeCommentInput: RemoveCommentInput) {}
}
