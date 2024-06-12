import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { FindReviewByIdsUseCase } from '@/modules/review/use-case/find-review-by-ids.use-case';

import { FindBusinessByIdsUseCase } from '../business/use-case/find-business-by-ids.use-case';

@Injectable({ scope: Scope.REQUEST })
export default class ReviewDataLoader {
  constructor(
    private readonly findReviewByIdsUseCase: FindReviewByIdsUseCase,
    private readonly findBusinessByIdsUseCase: FindBusinessByIdsUseCase,
  ) {}

  public readonly batchReview = new DataLoader(
    async (reviewIds: readonly string[]) => {
      const review = await this.findReviewByIdsUseCase.findReviewByIds({
        ids: reviewIds as string[],
      });
      const reviewMap = new Map(
        review.results.map(rv => [rv._id.toHexString(), rv]),
      );
      const finalReview = reviewIds.map(ivId => reviewMap.get(ivId));

      return finalReview;
    },
  );

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
