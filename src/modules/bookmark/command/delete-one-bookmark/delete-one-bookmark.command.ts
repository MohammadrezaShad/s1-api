import { DeleteOneBookmarkInput } from '../../dto/delete-bookmark.dto';

export class DeleteّOneBookmarkCommand {
  constructor(public readonly deleteOneBookmarkInput: DeleteOneBookmarkInput) {}
}
