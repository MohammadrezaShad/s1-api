import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { QuestionModel } from '../../model/question.model';
import { QuestionRepository } from '../../question.repository';
import { FindQuestionByIdsQuery } from './find-question-by-ids.query';

@QueryHandler(FindQuestionByIdsQuery)
export class FindQuestionByIdsHandler
  implements IQueryHandler<FindQuestionByIdsQuery>
{
  constructor(private readonly repository: QuestionRepository) {}

  async execute({ ids }: FindQuestionByIdsQuery): Promise<QuestionModel[]> {
    return this.repository.findManyById(ids);
  }
}
