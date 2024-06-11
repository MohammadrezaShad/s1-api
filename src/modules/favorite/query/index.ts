import { CheckRepeatedFavoriteByUserHandler } from '@/modules/favorite/query/check-repeated-favorite-by-user/check-repeated-favorite-by-user.handler';
import { FavoriteCountByPostHandler } from '@/modules/favorite/query/fav-count-by-post/favorite-count-by-post.handler';
import { FindFavoriteByIdHandler } from '@/modules/favorite/query/find-favorite-by-id/find-favorite-by-id.handler';
import { FindFavoriteByIdsHandler } from '@/modules/favorite/query/find-favorite-by-ids/find-favorite-by-ids.handler';
import { SearchFavoriteHanler } from '@/modules/favorite/query/search-favorite/search-favorite.handler';
import { FindFavoriteByPostHandler } from './find-favorite-by-post/find-favorite-by-post.handler';

export const FavoriteQueryHandlers = [
  FindFavoriteByIdHandler,
  FindFavoriteByIdsHandler,
  FindFavoriteByPostHandler,
  SearchFavoriteHanler,
  FavoriteCountByPostHandler,
  CheckRepeatedFavoriteByUserHandler,
];
