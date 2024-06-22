import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AnswerModel } from '../../model/answer.model';
import { AnswerRepository } from '../../answer.repository';
import { FindAnswerByQuestionQuery } from './find-answer-by-question.query';

@QueryHandler(FindAnswerByQuestionQuery)
export class FindAnswerByQuestionHandler
  implements IQueryHandler<FindAnswerByQuestionQuery>
{
  constructor(private readonly repository: AnswerRepository) {}

  async execute({
    question,
  }: FindAnswerByQuestionQuery): Promise<AnswerModel[]> {
    return this.repository.findManyAnswerByQuestion(question);
  }
}
