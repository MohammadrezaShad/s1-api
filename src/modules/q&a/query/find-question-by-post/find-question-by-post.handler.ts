import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { QuestionModel } from '../../model/question.model';
import { QuestionRepository } from '../../question.repository';
import { FindQuestionByPostQuery } from './find-question-by-post.query';

@QueryHandler(FindQuestionByPostQuery)
export class FindQuestionByPostHandler
  implements IQueryHandler<FindQuestionByPostQuery>
{
  constructor(private readonly repository: QuestionRepository) {}

  async execute({ post }: FindQuestionByPostQuery): Promise<QuestionModel[]> {
    return this.repository.findManyQuestionByPost(post);
  }
}
