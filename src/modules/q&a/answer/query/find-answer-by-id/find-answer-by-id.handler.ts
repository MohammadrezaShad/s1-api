import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AnswerModel } from '../../model/answer.model';
import { AnswerRepository } from '../../answer.repository';
import { FindAnswerByIdQuery } from './find-answer-by-id.query';

@QueryHandler(FindAnswerByIdQuery)
export class FindAnswerByIdHandler
  implements IQueryHandler<FindAnswerByIdQuery>
{
  constructor(private readonly repository: AnswerRepository) {}

  async execute({ id }: FindAnswerByIdQuery): Promise<AnswerModel | null> {
    return this.repository.findById(id);
  }
}
