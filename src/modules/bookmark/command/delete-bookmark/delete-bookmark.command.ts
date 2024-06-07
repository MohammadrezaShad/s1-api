import { DeleteBookmarkInput } from '../../dto/delete-bookmark.dto';

export class DeleteّBookmarkCommand {
  constructor(public readonly deleteBookmarkInput: DeleteBookmarkInput) {}
}
