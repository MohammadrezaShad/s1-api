import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';

import { CreateReviewInput } from '../dto/create-review.dto';
import { ReviewRepository } from '../review.repository';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewModelFactory implements ModelFactory<ReviewModel> {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async create({
    content,
    post,
    type,
    authorEmail,
    author,
    parent,
    user,
  }: CreateReviewInput): Promise<ReviewModel> {
    const review = new ReviewModel(
      new ObjectId().toHexString(),
      content,
      post,
      type,
      authorEmail,
      author,
      user,
      parent,
    );
    await this.reviewRepository.createReview(review);
    return review;
  }
}
