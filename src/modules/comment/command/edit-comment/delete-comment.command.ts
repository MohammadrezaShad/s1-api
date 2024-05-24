import { EditCommentInput } from '../../dto/edit-comment.dto';

export class EditCommentCommand {
  constructor(public readonly editCommentInput: EditCommentInput) {}
}
