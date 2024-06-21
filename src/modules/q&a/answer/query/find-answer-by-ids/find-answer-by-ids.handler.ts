import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AnswerModel } from '../../model/answer.model';
import { AnswerRepository } from '../../answer.repository';
import { FindAnswerByIdsQuery } from './find-answer-by-ids.query';

@QueryHandler(FindAnswerByIdsQuery)
export class FindAnswerByIdsHandler
  implements IQueryHandler<FindAnswerByIdsQuery>
{
  constructor(private readonly repository: AnswerRepository) {}

  async execute({ ids }: FindAnswerByIdsQuery): Promise<AnswerModel[]> {
    return this.repository.findManyById(ids);
  }
}
