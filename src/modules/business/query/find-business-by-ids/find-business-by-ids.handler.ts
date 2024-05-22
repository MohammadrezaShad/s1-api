import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindBusinessByIdsQuery } from './find-business-by-ids.query';
import { BusinessRepository } from '../../business.repository';
import { BusinessModel } from '../../model/business.model';

@QueryHandler(FindBusinessByIdsQuery)
export class FindUserbyIdsHandler
  implements IQueryHandler<FindBusinessByIdsQuery>
{
  constructor(private readonly businessRepository: BusinessRepository) {}

  async execute({ ids }: FindBusinessByIdsQuery): Promise<BusinessModel[]> {
    return this.businessRepository.findByIds({ ids });
  }
}
