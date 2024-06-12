import { DeleteManyReviewInput } from '../../dto/delete-review.dto';

export class BulkDeleteReviewCommand {
  constructor(public readonly deleteManyReviewInput: DeleteManyReviewInput) {}
}
