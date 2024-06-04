import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { FindTaxonomyByIdsUseCase } from '../taxonomy/use-case/find-taxonomy-by-ids.use-case';

@Injectable({ scope: Scope.REQUEST })
export default class BusinessDataLoader {
  constructor(
    private readonly findTaxonomyByIdsUseCase: FindTaxonomyByIdsUseCase,
  ) {}

  public readonly batchTaxonomies = new DataLoader(
    async (taxonomyList: readonly string[][]) => {
      const ids = [...new Set(taxonomyList.flat())];
      const taxonomies =
        await this.findTaxonomyByIdsUseCase.findTaxonomyByIds(ids);

      const taxonomiesMap = new Map(
        taxonomies.results.map(taxonomy => [taxonomy._id.toString(), taxonomy]),
      );
      const data = taxonomyList.map(taxonomyId => {
        const finalTaxonomies = taxonomyId.map(pId => taxonomiesMap.get(pId));

        return finalTaxonomies;
      });
      return data;
    },
  );
}
