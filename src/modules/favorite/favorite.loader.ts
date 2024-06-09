import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { FindBusinessByIdsUseCase } from '../business/use-case/find-business-by-ids.use-case';

@Injectable({ scope: Scope.REQUEST })
export class FavoriteLoader {
  constructor(
    private readonly findBusinessByIdsUseCase: FindBusinessByIdsUseCase,
  ) {}

  public readonly batchBusiness = new DataLoader(
    async (businessIds: readonly string[]) => {
      const businessList =
        await this.findBusinessByIdsUseCase.findBusinessByIds({
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
