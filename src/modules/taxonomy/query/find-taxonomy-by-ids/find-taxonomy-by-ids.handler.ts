import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Taxonomy } from '@/modules/taxonomy/model/taxonomy.model';
import { TaxonomyRepository } from '@/modules/taxonomy/taxonomy.repository';
import { FindTaxonomyByIdsQuery } from './find-taxonomy-by-ids.query';

@QueryHandler(FindTaxonomyByIdsQuery)
export class FindTaxonomyByIdsHandler
  implements IQueryHandler<FindTaxonomyByIdsQuery>
{
  constructor(private readonly taxonomyRepository: TaxonomyRepository) {}

  async execute({ ids }: FindTaxonomyByIdsQuery): Promise<Taxonomy[]> {
    return this.taxonomyRepository.findByIds({ ids });
  }
}
