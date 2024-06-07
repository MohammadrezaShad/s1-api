import { DeleteBookmarksInput } from '../../dto/delete-bookmark.dto';

export class BulkDeleteBookmarkCommand {
  constructor(public readonly deleteBookmarksInput: DeleteBookmarksInput) {}
}
