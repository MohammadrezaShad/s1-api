import { AggregateRoot } from '@nestjs/cqrs';

import { BooleanEnum } from '@/common/enums/boolean.enum';

export class AnswerModel extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly content: string,
    private readonly question: string,
    private readonly date: string,
    private readonly user: string,
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

  getQuestion(): string {
    return this.question;
  }

  getUser(): string {
    return this.user;
  }

  getDate(): string {
    return this.date;
  }

  getApproved(): BooleanEnum {
    return this.approved;
  }
}
