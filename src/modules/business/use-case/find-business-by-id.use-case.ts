import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { BusinessEntityFactory } from '../entity/business.factory';
import {
  FindBusinessByIdInput,
  FindBusinessOutput,
} from '../dto/find-business.dto';
import { BusinessModel } from '../model/business.model';
import { FindBusinessByIdQuery } from '../query/find-business-by-id/find-business-by-id.query';
import { BUSINESS_NOT_FOUND } from '../constant/error-message.constant';

@Injectable()
export class FindBusinessByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly businessEntityFactory: BusinessEntityFactory,
  ) {}

  async findBusinessById({
    id,
  }: FindBusinessByIdInput): Promise<FindBusinessOutput> {
    try {
      const business: BusinessModel = await this.queryBus.execute(
        new FindBusinessByIdQuery(id),
      );
      if (!business) {
        throw new NotFoundException(BUSINESS_NOT_FOUND);
      }

      return {
        success: true,
        result: this.businessEntityFactory.create(business),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
