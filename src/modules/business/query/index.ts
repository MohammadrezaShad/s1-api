import { FindBusinessbyIdHandler } from './find-business-by-id/find-business-by-id.handler';
import { FindUserbyIdsHandler } from './find-business-by-ids/find-business-by-ids.handler';
import { SearchBusinessHanler } from './search-business/search-business.handler';

export const BusinessQueryHandlers = [
  FindBusinessbyIdHandler,
  FindUserbyIdsHandler,
  SearchBusinessHanler,
];