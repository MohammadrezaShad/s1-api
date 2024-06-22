import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { QuestionModel } from '../../model/question.model';
import { QuestionRepository } from '../../question.repository';
import { FindQuestionByBusinessQuery } from './find-question-by-business.query';

@QueryHandler(FindQuestionByBusinessQuery)
export class FindQuestionByBusinessHandler
  implements IQueryHandler<FindQuestionByBusinessQuery>
{
  constructor(private readonly repository: QuestionRepository) {}

  async execute({
    business,
  }: FindQuestionByBusinessQuery): Promise<QuestionModel[]> {
    return this.repository.findManyQuestionByBusiness(business);
  }
}
