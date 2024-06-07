import { BadRequestException, Injectable } from '@nestjs/common';

import { FAVORITE_ID_IS_NOT_CORRECT } from '@/modules/favorite/constant/error-message.constant';
import { FindFavoriteByIdUseCase } from '@/modules/favorite/use-case/find-favorite-by-id.use-case';

@Injectable()
export class FavoriteHelepr {
  constructor(
    private readonly findFavoriteByIdUseCase: FindFavoriteByIdUseCase,
  ) {}

  // async validateBusinessId(id: string) {
  //   const fav = await this.findFavoriteByIdUseCase.findFavById({ id });
  //   if (!fav || fav === null)
  //     throw new BadRequestException(FAVORITE_ID_IS_NOT_CORRECT);
  // }

  // async validatePermissionName(name: string, permId: string | null) {
  //   const role = await this.repository.findOneItemByName(name, permId);
  //   if (role) throw new BadRequestException(BUSINESS_NAME_DUPLICATED);
  // }

  // async validatePermissionSlug(title: string, permId: string | null) {
  //   const role = await this.repository.findOneItemBySlug(title, permId);
  //   if (role) throw new BadRequestException(BUSINESS_SLUG_DUPLICATED);
  // }
}
