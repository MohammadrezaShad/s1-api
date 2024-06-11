import { FindBusinessbyIdHandler } from './find-business-by-id/find-business-by-id.handler';
import { FindBusinessByIdsHandler } from './find-business-by-ids/find-business-by-ids.handler';
import { FindBusinessByUserHandler } from './find-business-by-user/find-business-by-user.handler';
import { SearchBusinessHanler } from './search-business/search-business.handler';

export const BusinessQueryHandlers = [
  FindBusinessbyIdHandler,
  FindBusinessByIdsHandler,
  FindBusinessByUserHandler,
  SearchBusinessHanler,
];
