import { BadRequestException, Injectable } from '@nestjs/common';

import { AnswerRepository } from '../answer.repository';
import { ANSWER_ID_IS_NOT_CORRECT } from '../constant/error-message.constant';

@Injectable()
export class AnswerHelepr {
  constructor(private readonly repository: AnswerRepository) {}

  async validateAnswerId(id: string) {
    const answer = await this.repository.findById(id);
    if (!answer || answer === null)
      throw new BadRequestException(ANSWER_ID_IS_NOT_CORRECT);
  }
}
