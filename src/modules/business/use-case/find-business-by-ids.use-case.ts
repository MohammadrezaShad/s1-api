import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { BusinessEntityFactory } from '../entity/business.factory';
import {
  FindBusinessByIdsInput,
  FindManyBusinessOutput,
} from '../dto/find-business.dto';
import { BusinessModel } from '../model/business.model';
import { FindBusinessByIdsQuery } from '../query/find-business-by-ids/find-business-by-ids.query';

@Injectable()
export class FindBusinessByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly businessEntityFactory: BusinessEntityFactory,
  ) {}

  async findBusinessByIds({
    ids,
  }: FindBusinessByIdsInput): Promise<FindManyBusinessOutput> {
    try {
      const business: BusinessModel[] = await this.queryBus.execute(
        new FindBusinessByIdsQuery(ids),
      );

      const resultList = business.map(model =>
        this.businessEntityFactory.create(model),
      );

      return {
        success: true,
        results: resultList,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
