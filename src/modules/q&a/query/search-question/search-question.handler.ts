import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchQuestionOutput } from '../../dto/search-question.dto';
import { QuestionRepository } from '../../question.repository';
import { SearchQuestionQuery } from './search-question.query';

@QueryHandler(SearchQuestionQuery)
export class SearchQuestionHanler
  implements IQueryHandler<SearchQuestionQuery>
{
  constructor(private readonly repository: QuestionRepository) {}

  async execute({
    searchReviewInput,
  }: SearchQuestionQuery): Promise<SearchQuestionOutput> {
    const result = await this.repository.search(searchReviewInput);
    return result;
  }
}
