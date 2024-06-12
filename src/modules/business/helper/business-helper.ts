import { BadRequestException, Injectable } from '@nestjs/common';

import { FindRoleByIdUseCase } from '@/modules/auth/components/role/use-case/find-role-by-id.use-case';
import { DeleteBookmarkUseCase } from '@/modules/bookmark/use-case/delete-bookmark.use-case';
import { FindBookmarkByPostUseCase } from '@/modules/bookmark/use-case/find-bookmark-by-post.use-case';
import { DeleteFavoriteUseCase } from '@/modules/favorite/use-case/delete-favorite.use-case';
import { FindFavoriteByPostUseCase } from '@/modules/favorite/use-case/find-favorite-by-post.use-case';
import { DeleteReviewUseCase } from '@/modules/review/use-case/delete-review.use-case';
import { FindReviewByPostUseCase } from '@/modules/review/use-case/find-review-by-post.use-case';
import { FindTaxonomyByIdUseCase } from '@/modules/taxonomy/use-case/find-taxonomy.use-case';
import { FindUserByIdUseCase } from '@/modules/user/use-case/find-user-by-id.use-case';

import { BusinessRepository } from '../business.repository';
import {
  BUSINESS_ID_IS_NOT_CORRECT,
  BUSINESS_NAME_DUPLICATED,
  BUSINESS_SLUG_DUPLICATED,
} from '../constant/error-message.constant';
import { FindBusinessByUserUseCase } from '../use-case/find-business-by-user.use-case';

@Injectable()
export class BusinessHelepr {
  constructor(
    private readonly repository: BusinessRepository,
    private readonly findTaxonomyByIdUseCase: FindTaxonomyByIdUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findRoleByIdUseCase: FindRoleByIdUseCase,
    private readonly findBookmarkByPostUseCase: FindBookmarkByPostUseCase,
    private readonly deleteBookmarkUseCase: DeleteBookmarkUseCase,
    private readonly findFavoriteByPostUseCase: FindFavoriteByPostUseCase,
    private readonly deleteFavoriteUseCase: DeleteFavoriteUseCase,
    private readonly findReviewByPostUseCase: FindReviewByPostUseCase,
    private readonly deleteReviewUseCase: DeleteReviewUseCase,
    private readonly findBusinessByUserUseCase: FindBusinessByUserUseCase,
  ) {}

  async validateBusinessId(id: string) {
    const business = await this.repository.findById({ id: id });
    if (!business || business === null)
      throw new BadRequestException(BUSINESS_ID_IS_NOT_CORRECT);
  }

  async validateBusinessName(name: string, id: string | null) {
    const role = await this.repository.findOneItemByName(name, id);
    if (role) throw new BadRequestException(BUSINESS_NAME_DUPLICATED);
  }

  async validateBusinessSlug(title: string, id: string | null) {
    const role = await this.repository.findOneItemBySlug(title, id);
    if (role) throw new BadRequestException(BUSINESS_SLUG_DUPLICATED);
  }

  async validateTaxonomy(id: string) {
    await this.findTaxonomyByIdUseCase.findTaxonomyById(id);
  }

  async deleteBookmarks(post: string) {
    const bookmarks =
      await this.findBookmarkByPostUseCase.findBookmarkByPost(post);
    for (const bookmark of bookmarks.results || []) {
      await this.deleteBookmarkUseCase.deleteBookmark({
        id: bookmark._id.toString(),
      });
    }
  }

  async deleteFavorites(post: string) {
    const favorites = await this.findFavoriteByPostUseCase.findFavByPost(post);
    for (const favorite of favorites.results || []) {
      await this.deleteFavoriteUseCase.deleteFav({
        id: favorite._id.toString(),
      });
    }
  }

  async deleteReview(post: string) {
    const review = await this.findReviewByPostUseCase.findReviewByPost({
      post: post,
    });
    for (const rv of review.results || []) {
      await this.deleteReviewUseCase.deleteReview({
        id: rv._id.toString(),
      });
    }
  }

  async validateNumberOdUserBusiness(userId: string) {
    const user = await this.findUserByIdUseCase.findUserById({ id: userId });
    if (user && user.result.roles.length == 1) {
      const role = await this.findRoleByIdUseCase.findRoleByid({
        id: user.result.roles[0],
      });
      if (role.result.name === 'REGULAR_USER') {
        const business =
          await this.findBusinessByUserUseCase.findBusinessByUser(userId);
        if (business && business.results.length) {
          throw new BadRequestException(
            'هر کاربر معمولی میتواند تنها یک بیزینس داشته باشد',
          );
        }
      }
    }
  }
}
