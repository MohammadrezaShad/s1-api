import { BulkDeleteFavoriteHandler } from '@/modules/favorite/command/bulk-delete-favorite/bulk-delete-favorite.handler';
import { CreateFavoriteHandler } from '@/modules/favorite/command/create-favorite/create-favorite.handler';
import { DeleteFavoriteHandler } from '@/modules/favorite/command/delete-favorite/delete-favorite.handler';
import { DeleteOneFavoriteHandler } from '@/modules/favorite/command/delete-one-favorite/delete-one-favorite.handler';
import { UpdateFavoriteHandler } from '@/modules/favorite/command/update-favorite/update-favorite.handler';

export const FavoriteCommandHandlers = [
  CreateFavoriteHandler,
  UpdateFavoriteHandler,
  DeleteFavoriteHandler,
  DeleteOneFavoriteHandler,
  BulkDeleteFavoriteHandler,
];
