import { UpdateBookmarkInput } from '../../dto/update-bookmark.dto';

export class UpdateBookmarkCommand {
  constructor(public readonly updateBookmarkInput: UpdateBookmarkInput) {}
}
