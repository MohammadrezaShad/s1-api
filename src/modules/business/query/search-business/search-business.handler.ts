import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchBusinessQuery } from './search-business.query';
import { BusinessRepository } from '../../business.repository';
import { SearchBusinessOutput } from '../../dto/search-business.dto';

@QueryHandler(SearchBusinessQuery)
export class SearchBusinessHanler
  implements IQueryHandler<SearchBusinessQuery>
{
  constructor(private readonly businessRepository: BusinessRepository) {}
  async execute({
    searchBusinessInput,
  }: SearchBusinessQuery): Promise<SearchBusinessOutput> {
    const result = this.businessRepository.search(searchBusinessInput);
    return result;
  }
}
