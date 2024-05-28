import { FindRepeatedFavoriteInput } from '@/modules/favorite/dto/find-favorite.dto';

export class FindRepeatedFavoriteQuery {
  constructor(
    public readonly findRepeatedFavoriteInput: FindRepeatedFavoriteInput,
  ) {}
}
