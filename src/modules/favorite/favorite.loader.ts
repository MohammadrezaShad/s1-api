import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { FindBusinessByIdsUseCase } from '../business/use-case/find-business-by-ids.use-case';
import { FindReviewByIdsUseCase } from '../review/use-case/find-review-by-ids.use-case';

@Injectable({ scope: Scope.REQUEST })
export class FavoriteLoader {
  constructor(
    private readonly findBusinessByIdsUseCase: FindBusinessByIdsUseCase,
    private readonly findReviewByIdsUseCase: FindReviewByIdsUseCase,
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

  public readonly batchReview = new DataLoader(
    async (reviewIds: readonly string[]) => {
      const reviewList = await this.findReviewByIdsUseCase.findReviewByIds({
        ids: reviewIds as string[],
      });
      const reviewMap = new Map(
        reviewList.results.map(review => [review._id.toHexString(), review]),
      );
      const finalReview = reviewIds.map(reviewId => reviewMap.get(reviewId));

      return finalReview;
    },
  );
}
