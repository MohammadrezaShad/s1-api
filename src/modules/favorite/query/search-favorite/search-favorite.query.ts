import { SearchFavoriteInput } from '@/modules/favorite/dto/search-favorite.dto';

export class SearchFavoriteQuery {
  constructor(readonly searchFavoriteInput: SearchFavoriteInput) {}
}
