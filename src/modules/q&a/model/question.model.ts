import { AggregateRoot } from '@nestjs/cqrs';

import { BooleanEnum } from '@/common/enums/boolean.enum';

export class QuestionModel extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly content: string,
    private readonly business: string,
    private readonly user: string,
    private readonly answers?: string[],
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

  getBusiness(): string {
    return this.business;
  }

  getUser(): string {
    return this.user;
  }

  getAnswers(): string[] {
    return this.answers;
  }

  getApproved(): BooleanEnum {
    return this.approved;
  }
}
