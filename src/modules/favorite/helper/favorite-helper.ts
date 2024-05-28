import { BadRequestException, Injectable } from '@nestjs/common';

import { FavoriteRepository } from '../favorite.repository';

@Injectable()
export class FavoriteHelepr {
  constructor(private readonly repository: FavoriteRepository) {}

  // async validateBusinessId(permId: string) {
  //   const business = await this.repository.findById({ id: permId });
  //   if (!business || business === null)
  //     throw new BadRequestException(BUSINESS_ID_IS_NOT_CORRECT);
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
