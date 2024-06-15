import { FindBookmarksByUserInput } from '../../dto/find-bookmark.dto';
export class GetBookmarksByUserQuery {
  constructor(
    public readonly findBookmarksByUserInput: FindBookmarksByUserInput,
  ) {}
}
