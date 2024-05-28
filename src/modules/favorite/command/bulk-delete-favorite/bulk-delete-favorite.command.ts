import { DeleteFavoritesInput } from '@/modules/favorite/dto/delete-favorite.dto';

export class BulkDeleteFavoriteCommand {
  constructor(public readonly deleteFavoritesInput: DeleteFavoritesInput) {}
}
