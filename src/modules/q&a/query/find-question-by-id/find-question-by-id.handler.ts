import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { QuestionModel } from '../../model/question.model';
import { QuestionRepository } from '../../question.repository';
import { FindQuestionByIdQuery } from './find-question-by-id.query';

@QueryHandler(FindQuestionByIdQuery)
export class FindQuestionByIdHandler
  implements IQueryHandler<FindQuestionByIdQuery>
{
  constructor(private readonly repository: QuestionRepository) {}

  async execute({ id }: FindQuestionByIdQuery): Promise<QuestionModel | null> {
    return this.repository.findById(id);
  }
}
