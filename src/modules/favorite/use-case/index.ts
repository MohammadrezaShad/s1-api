import { BulkDeleteFavoriteUseCase } from '@/modules/favorite/use-case/bulk-delete-favorite.use-case';
import { CheckRepeatedFavoriteByUserUseCase } from '@/modules/favorite/use-case/check-repeated-favorite-by-user.use-case';
import { CreateFavoriteUseCase } from '@/modules/favorite/use-case/create-favorite.use-case';
import { DeleteFavoriteUseCase } from '@/modules/favorite/use-case/delete-favorite.use-case';
import { DeleteOneFavoriteUseCase } from '@/modules/favorite/use-case/delete-one-favorite.use-case';
import { FavoriteCountByPostUseCase } from '@/modules/favorite/use-case/favorite-count-by-post.use-case';
import { FindFavoriteByIdUseCase } from '@/modules/favorite/use-case/find-favorite-by-id.use-case';
import { FindFavoriteByIdsUseCase } from '@/modules/favorite/use-case/find-favorite-by-ids.use-case';
import { GetFavoritesByUserUseCase } from '@/modules/favorite/use-case/get-favorite-by-user.use-case';
import { SearchFavoriteUseCase } from '@/modules/favorite/use-case/search-favorite.use-case';
import { UpdateFavoriteUseCase } from '@/modules/favorite/use-case/update-favorite.use-case';

import { FindFavoriteByPostUseCase } from './find-favorite-by-post.use-case';

export const FavoriteUseCases = [
  CreateFavoriteUseCase,
  UpdateFavoriteUseCase,
  DeleteFavoriteUseCase,
  DeleteOneFavoriteUseCase,
  BulkDeleteFavoriteUseCase,
  FindFavoriteByIdUseCase,
  FindFavoriteByIdsUseCase,
  FindFavoriteByPostUseCase,
  SearchFavoriteUseCase,
  FavoriteCountByPostUseCase,
  CheckRepeatedFavoriteByUserUseCase,
  GetFavoritesByUserUseCase,
];
