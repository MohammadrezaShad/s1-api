import { UpdateReviewInput } from '../../dto/update-review.dto';

export class UpdateReviewCommand {
  constructor(public readonly updateReviewInput: UpdateReviewInput) {}
}
