import { FavoriteCountByPostHandler } from '@/modules/favorite/query/fav-count-by-post/favorite-count-by-post.handler';
import { FindFavoritebyIdHandler } from '@/modules/favorite/query/find-favorite-by-id/find-favorite-by-id.handler';
import { FindFavoritebyIdsHandler } from '@/modules/favorite/query/find-favorite-by-ids/find-favorite-by-ids.handler';
import { SearchFavoriteHanler } from '@/modules/favorite/query/search-favorite/search-favorite.handler';

export const FavoriteQueryHandlers = [
  FindFavoritebyIdHandler,
  FindFavoritebyIdsHandler,
  SearchFavoriteHanler,
  FavoriteCountByPostHandler,
];
