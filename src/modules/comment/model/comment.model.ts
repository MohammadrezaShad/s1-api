import { AggregateRoot } from '@nestjs/cqrs';
import { CommentType } from '../enum/comment-type.enum';
import { BooleanEnum } from '@/common/enums/boolean.enum';

export class CommentModel extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly content: string,
    private readonly post: string,
    private readonly type: CommentType,
    private readonly authorEmail: string,
    private readonly author: string,
    private readonly createUser: string,
    private readonly parent: string,
    private readonly approved?: BooleanEnum,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getContent(): string {
    return this.content;
  }

  getPost(): string {
    return this.post;
  }

  getType(): CommentType {
    return this.type;
  }

  getAuthorEmail(): string {
    return this.authorEmail;
  }

  getAuthor(): string {
    return this.author;
  }

  getCreateUser(): string {
    return this.createUser;
  }

  getParent(): string {
    return this.parent;
  }

  getApproved(): BooleanEnum {
    return this.approved;
  }
}
