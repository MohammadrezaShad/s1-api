import { DeleteOneFavoriteInput } from '@/modules/favorite/dto/delete-favorite.dto';

export class DeleteOneFavoriteCommand {
  constructor(public readonly deleteOneFavoriteInput: DeleteOneFavoriteInput) {}
}
