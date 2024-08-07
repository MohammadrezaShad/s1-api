import { AggregateRoot } from '@nestjs/cqrs';

import { BooleanEnum } from '@/common/enums/boolean.enum';

import { ReviewType } from '../enum/review-type.enum';

export class ReviewModel extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly content: string,
    private readonly post: string,
    private readonly type: ReviewType,
    private readonly authorEmail: string,
    private readonly author: string,
    private readonly createUser: string,
    private readonly parent: string,
    private readonly score?: number,
    private readonly image?: string,
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

  getType(): ReviewType {
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

  getScore(): number {
    return this.score;
  }

  getImage(): string {
    return this.image;
  }

  getApproved(): BooleanEnum {
    return this.approved;
  }
}
