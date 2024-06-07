import { CreateBookmarkInput } from '../../dto/create-bookmark.dto';

export class CreateBookmarkCommand {
  constructor(public readonly createBookmarkInput: CreateBookmarkInput) {}
}
