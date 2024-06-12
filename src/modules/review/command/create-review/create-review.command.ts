import { CreateReviewInput } from '../../dto/create-review.dto';

export class CreateReviewCommand {
  constructor(public readonly createReviewInput: CreateReviewInput) {}
}
