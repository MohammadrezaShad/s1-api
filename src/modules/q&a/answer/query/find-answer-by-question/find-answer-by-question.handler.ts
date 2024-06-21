import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AnswerModel } from '../../model/answer.model';
import { AnswerRepository } from '../../answer.repository';
import { FindReviewByQuestionQuery } from './find-answer-by-question.query';

@QueryHandler(FindReviewByQuestionQuery)
export class FindAnswerByQuestionHandler
  implements IQueryHandler<FindReviewByQuestionQuery>
{
  constructor(private readonly repository: AnswerRepository) {}

  async execute({
    question,
  }: FindReviewByQuestionQuery): Promise<AnswerModel[]> {
    return this.repository.findManyAnswerByQuestion(question);
  }
}
