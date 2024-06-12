import { BadRequestException, Injectable } from '@nestjs/common';

import { REVIEW_ID_IS_NOT_CORRECT } from '../constant/error-message.constant';
import { ReviewRepository } from '../review.repository';

@Injectable()
export class ReviewHelepr {
  constructor(private readonly repository: ReviewRepository) {}

  async validateReviewId(id: string) {
    const review = await this.repository.findById(id);
    if (!review || review === null)
      throw new BadRequestException(REVIEW_ID_IS_NOT_CORRECT);
  }
}
