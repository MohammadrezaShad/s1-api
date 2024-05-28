import { DeleteFavoriteInput } from '@/modules/favorite/dto/delete-favorite.dto';

export class DeleteّFavoriteCommand {
  constructor(public readonly deleteFavoriteInput: DeleteFavoriteInput) {}
}
