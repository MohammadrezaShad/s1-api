import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { FindTaxonomyByIdsUseCase } from '../taxonomy/use-case/find-taxonomy-by-ids.use-case';
import { GetBookmarksByUserUseCase } from '../bookmark/use-case/get-bookmarks-by-user.use-case';

@Injectable({ scope: Scope.REQUEST })
export default class BusinessDataLoader {
  constructor(
    private readonly findTaxonomyByIdsUseCase: FindTaxonomyByIdsUseCase,
    private readonly getBookmarksByUserUseCase: GetBookmarksByUserUseCase,
  ) {}

  public readonly batchTaxonomies = new DataLoader(
    async (taxonomyList: readonly string[][]) => {
      const ids = [...new Set(taxonomyList.flat())];
      const taxonomies =
        await this.findTaxonomyByIdsUseCase.findTaxonomyByIds(ids);

      const taxonomiesMap = new Map(
        taxonomies.results.map(taxonomy => [taxonomy._id.toString(), taxonomy]),
      );
      const data = taxonomyList.map(taxonomyId => {
        const finalTaxonomies = taxonomyId.map(pId => taxonomiesMap.get(pId));

        return finalTaxonomies;
      });
      return data;
    },
  );

  public readonly batchBookmarksByUser = new DataLoader(
    async (
      list: readonly {
        post: string;
        user: string;
      }[],
    ) => {
      const postIds = list.map(item => item.post);
      const ids = [...new Set(postIds)];
      const user = list.at(0)?.user;

      const bookmarks = await this.getBookmarksByUserUseCase.getBookmarksByUser(
        {
          posts: ids,
          user,
        },
      );

      const bookmarksMap = new Map(
        bookmarks.results.map(bookmarkItem => [
          bookmarkItem.post.toString(),
          bookmarkItem,
        ]),
      );

      const finalBookMarks = list.map(
        ({ post: posts }) => !!bookmarksMap.get(posts)?.post,
      );

      return finalBookMarks;
    },
  );
}
