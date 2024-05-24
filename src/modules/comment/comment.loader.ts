import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { FindCommentByIdsUseCase } from './use-case/find-comment-by-ids.use-case';
import { FindBusinessByIdsUseCase } from '../business/use-case/find-business-by-ids.use-case';

@Injectable({ scope: Scope.REQUEST })
export default class CommentDataLoader {
  constructor(
    private readonly findCommentByIdsUseCase: FindCommentByIdsUseCase,
    private readonly findBusinessByIdsUseCase: FindBusinessByIdsUseCase,
  ) {}

  public readonly batchComments = new DataLoader(
    async (commentsIds: readonly string[]) => {
      const comment = await this.findCommentByIdsUseCase.findCommentByIds({
        commentIds: commentsIds as string[],
      });
      const commentsMap = new Map(
        comment.results.map(cmt => [cmt._id.toHexString(), cmt]),
      );
      const finalComments = commentsIds.map(commentId =>
        commentsMap.get(commentId),
      );

      return finalComments;
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
