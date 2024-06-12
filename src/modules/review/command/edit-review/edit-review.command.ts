import { EditReviewInput } from '../../dto/edit-review.dto';

export class EditReviewCommand {
  constructor(public readonly editReviewInput: EditReviewInput) {}
}
