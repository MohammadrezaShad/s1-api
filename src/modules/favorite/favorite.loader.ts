import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { FindFavoriteByIdsUseCase } from './use-case/find-favorite-by-ids.use-case';

@Injectable({ scope: Scope.REQUEST })
export class FavoriteLoader {
  constructor(
    private readonly findFavoriteByIdsUseCase: FindFavoriteByIdsUseCase,
  ) {}

  public readonly batchBusiness = new DataLoader(
    async (businessIds: readonly string[]) => {
      const businessList = await this.findFavoriteByIdsUseCase.findFavIds({
        ids: businessIds as string[],
      });
      const businessMap = new Map(
        businessList.results.map(business => [
          business._id.toHexString(),
          business,
        ]),
      );
      const finalBusiness = businessIds.map(businessId =>
        businessMap.get(businessId),
      );

      return finalBusiness;
    },
  );
}
