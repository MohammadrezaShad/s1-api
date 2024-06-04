import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindTaxonomyByIdsOutput } from '@/modules/taxonomy/dto/find-taxonomy.dto';
import { TaxonomyEntityFactory } from '@/modules/taxonomy/entity/taxonomy.factory';
import { FindTaxonomyByIdsQuery } from '../query/find-taxonomy-by-ids/find-taxonomy-by-ids.query';

@Injectable()
export class FindTaxonomyByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly taxonomyFactory: TaxonomyEntityFactory,
  ) {}

  async findTaxonomyByIds(ids: string[]): Promise<FindTaxonomyByIdsOutput> {
    try {
      const taxonomies = await this.queryBus.execute(
        new FindTaxonomyByIdsQuery(ids),
      );
      const resultList = taxonomies.map(model =>
        this.taxonomyFactory.create(model),
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
