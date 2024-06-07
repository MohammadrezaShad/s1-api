import { FindRepeatedBookmarkInput } from '../../dto/find-bookmark.dto';

export class FindRepeatedBookmarkQuery {
  constructor(
    public readonly findRepeatedBookmarkInput: FindRepeatedBookmarkInput,
  ) {}
}
