import { DeleteReviewInput } from '../../dto/delete-review.dto';

export class DeleteReviewCommand {
  constructor(public readonly deleteReviewInput: DeleteReviewInput) {}
}
