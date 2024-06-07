import { BulkDeleteBookmarkHandler } from './bulk-delete-bookmark/bulk-delete-bookmark.handler';
import { CreateBookmarkHandler } from './create-bookmark/create-bookmark.handler';
import { DeleteBookmarkHandler } from './delete-bookmark/delete-bookmark.handler';
import { DeleteOneBookmarkHandler } from './delete-one-bookmark/delete-one-bookmark.handler';
import { UpdateBookmarkHandler } from './update-bookmark/update-bookmark.handler';

export const BookmarkCommandHandlers = [
  CreateBookmarkHandler,
  UpdateBookmarkHandler,
  DeleteBookmarkHandler,
  DeleteOneBookmarkHandler,
  BulkDeleteBookmarkHandler,
];
