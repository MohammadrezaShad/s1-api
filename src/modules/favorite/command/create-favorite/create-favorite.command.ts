import { CreateFavoriteInput } from '@/modules/favorite/dto/create-favorite.dto';

export class CreateFavoriteCommand {
  constructor(public readonly createFavoriteInput: CreateFavoriteInput) {}
}
