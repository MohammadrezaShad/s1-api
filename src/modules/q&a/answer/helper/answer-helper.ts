import { BadRequestException, Injectable } from '@nestjs/common';

import { AnswerRepository } from '../answer.repository';
import { ANSWER_ID_IS_NOT_CORRECT } from '../constant/error-message.constant';
import { FindQuestionByIdUseCase } from '../../use-case/find-question-by-id.use-case';
import { UpdateQuestionUseCase } from '../../use-case/update-question.use-case';

@Injectable()
export class AnswerHelepr {
  constructor(
    private readonly repository: AnswerRepository,
    private readonly findQuestionByIdUseCase: FindQuestionByIdUseCase,
    private readonly updateQuestionUseCase: UpdateQuestionUseCase,
  ) {}

  async validateAnswerId(id: string) {
    const answer = await this.repository.findById(id);
    if (!answer || answer === null)
      throw new BadRequestException(ANSWER_ID_IS_NOT_CORRECT);
  }

  async updateQuestion(questionId: string, answerId: string) {
    const question = await this.findQuestionByIdUseCase.findQuestionById({
      id: questionId,
    });
    const answers = question.result.answers;
    const newAnswers = answers.filter(item => item !== answerId);
    await this.updateQuestionUseCase.updateQuestion({
      id: questionId,
      answers: newAnswers,
    });
  }
}
