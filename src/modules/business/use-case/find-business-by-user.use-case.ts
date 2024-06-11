import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { BusinessEntityFactory } from '../entity/business.factory';
import { FindManyBusinessOutput } from '../dto/find-business.dto';
import { BusinessModel } from '../model/business.model';
import { FindBusinessByUserQuery } from '../query/find-business-by-user/find-business-by-user.query';

@Injectable()
export class FindBusinessByUserUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly businessEntityFactory: BusinessEntityFactory,
  ) {}

  async findBusinessByUser(user: string): Promise<FindManyBusinessOutput> {
    try {
      const business: BusinessModel[] = await this.queryBus.execute(
        new FindBusinessByUserQuery(user),
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
