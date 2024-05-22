import { SearchBusinessInput } from '../../dto/search-business.dto';

export class SearchBusinessQuery {
  constructor(readonly searchBusinessInput: SearchBusinessInput) {}
}
