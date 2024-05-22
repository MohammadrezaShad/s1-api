import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindBusinessByIdQuery } from './find-business-by-id.query';
import { BusinessRepository } from '../../business.repository';
import { BusinessModel } from '../../model/business.model';

@QueryHandler(FindBusinessByIdQuery)
export class FindBusinessbyIdHandler
  implements IQueryHandler<FindBusinessByIdQuery>
{
  constructor(private readonly businessRepository: BusinessRepository) {}

  async execute({ id }: FindBusinessByIdQuery): Promise<BusinessModel | null> {
    return this.businessRepository.findById({ id });
  }
}
