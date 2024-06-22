import { BadRequestException, Injectable } from '@nestjs/common';

import { QuestionRepository } from '../question.repository';
import { QUESTION_ID_IS_NOT_CORRECT } from '../constant/error-message.constant';
import { BulkDeleteAnswerUseCase } from '../answer/use-case/bulk-delete-answer.use-case';
import { FindAnswerByQuestionUseCase } from '../answer/use-case/find-answer-by-question.use-case';

@Injectable()
export class QuestionHelepr {
  constructor(
    private readonly repository: QuestionRepository,
    private readonly findAnswerByQuestionUseCase: FindAnswerByQuestionUseCase,
    private readonly bulkDeleteAnswerUseCase: BulkDeleteAnswerUseCase,
  ) {}

  async validateReviewId(id: string) {
    const question = await this.repository.findById(id);
    if (!question || question === null)
      throw new BadRequestException(QUESTION_ID_IS_NOT_CORRECT);
  }

  async deleteAnswers(questionId: string) {
    const answers = await this.findAnswerByQuestionUseCase.findAnswerByQuestion(
      { question: questionId },
    );
    const answerIds = answers.results?.map(({ _id }) => _id.toString()) || [];

    if (answerIds && answerIds.length)
      await this.bulkDeleteAnswerUseCase.bulkDeleteAnswer({
        ids: answerIds,
      });
  }
}
