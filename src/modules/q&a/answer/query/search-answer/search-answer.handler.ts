import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchAnswerOutput } from '../../dto/search-answer.dto';
import { AnswerRepository } from '../../answer.repository';
import { SearchAnswerQuery } from './search-answer.query';

@QueryHandler(SearchAnswerQuery)
export class SearchAnswerHanler implements IQueryHandler<SearchAnswerQuery> {
  constructor(private readonly repository: AnswerRepository) {}

  async execute({
    searchAnswerInput,
  }: SearchAnswerQuery): Promise<SearchAnswerOutput> {
    const result = await this.repository.search(searchAnswerInput);
    return result;
  }
}
