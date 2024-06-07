import { SearchFavoriteInput as SearchBookmarkInput } from '@/modules/favorite/dto/search-favorite.dto';

export class SearchBookmarkQuery {
  constructor(readonly searchBookmarkInput: SearchBookmarkInput) {}
}
