import { BookmarkCountByPostUseCase } from './bookmark-count-by-post.use-case';
import { BulkDeleteBookmarkUseCase } from './bulk-delete-bookmark.use-case';
import { CheckRepeatedBookmarkByUserUseCase } from './check-repeated-bookmark-by-user.use-case';
import { CreateBookmarkUseCase } from './create-bookmark.use-case';
import { DeleteBookmarkUseCase } from './delete-bookmark.use-case';
import { DeleteOneBookmarkUseCase } from './delete-one-bookmark.use-case';
import { FindBookmarkByIdUseCase } from './find-bookmark-by-id.use-case';
import { FindBookmarkByIdsUseCase } from './find-bookmark-by-ids.use-case';
import { FindBookmarkByPostUseCase } from './find-bookmark-by-post.use-case';
import { GetBookmarksByUserUseCase } from './get-bookmarks-by-user.use-case';
import { SearchBookmarkUseCase } from './search-bookmark.use-case';
import { UpdateBookmarkUseCase } from './update-bookmark.use-case';

export const BookmarkUseCases = [
  CreateBookmarkUseCase,
  UpdateBookmarkUseCase,
  DeleteBookmarkUseCase,
  DeleteOneBookmarkUseCase,
  BulkDeleteBookmarkUseCase,
  FindBookmarkByIdUseCase,
  FindBookmarkByIdsUseCase,
  FindBookmarkByPostUseCase,
  SearchBookmarkUseCase,
  BookmarkCountByPostUseCase,
  CheckRepeatedBookmarkByUserUseCase,
  GetBookmarksByUserUseCase,
];
