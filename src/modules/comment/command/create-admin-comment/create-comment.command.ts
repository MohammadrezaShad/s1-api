import { CreateAdminCommentInput } from '../../dto/create-comment.dto';

export class CreateAdminCommentCommand {
  constructor(
    public readonly createAdminCommentInput: CreateAdminCommentInput,
  ) {}
}
