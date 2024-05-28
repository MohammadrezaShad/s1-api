import { UpdateFavoriteInput } from '@/modules/favorite/dto/update-favorite.dto';

export class UpdateFavoriteCommand {
  constructor(public readonly updateFavoriteInput: UpdateFavoriteInput) {}
}
