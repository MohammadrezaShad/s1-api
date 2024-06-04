import { FindTaxonomyByIdHandler } from './find-taxonomy-by-id/find-taxonomy-by-id.handler';
import { FindTaxonomyByIdsHandler } from './find-taxonomy-by-ids/find-taxonomy-by-ids.handler';
import { FindTaxonomyBySlugHandler } from './find-taxonomy-by-slug/find-taxonomy-by-slug.handler';
import { SearchTaxonomyHandler } from './search-taxonomy/search-taxonomy.handler';

export const QueryHandlers = [
  FindTaxonomyByIdHandler,
  FindTaxonomyByIdsHandler,
  FindTaxonomyBySlugHandler,
  SearchTaxonomyHandler,
];
