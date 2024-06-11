import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindBusinessByUserQuery } from './find-business-by-user.query';
import { BusinessRepository } from '../../business.repository';
import { BusinessModel } from '../../model/business.model';

@QueryHandler(FindBusinessByUserQuery)
export class FindBusinessByUserHandler
  implements IQueryHandler<FindBusinessByUserQuery>
{
  constructor(private readonly businessRepository: BusinessRepository) {}

  async execute({ user }: FindBusinessByUserQuery): Promise<BusinessModel[]> {
    return this.businessRepository.findByUser(user);
  }
}
