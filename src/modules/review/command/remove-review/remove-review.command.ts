import { RemoveReviewInput } from '../../dto/delete-review.dto';

export class RemoveReviewCommand {
  constructor(public readonly removeReviewInput: RemoveReviewInput) {}
}
