import { BadRequestException, Injectable } from '@nestjs/common';

import { QuestionRepository } from '../question.repository';
import { QUESTION_ID_IS_NOT_CORRECT } from '../constant/error-message.constant';

@Injectable()
export class QuestionHelepr {
  constructor(private readonly repository: QuestionRepository) {}

  async validateReviewId(id: string) {
    const question = await this.repository.findById(id);
    if (!question || question === null)
      throw new BadRequestException(QUESTION_ID_IS_NOT_CORRECT);
  }
}
