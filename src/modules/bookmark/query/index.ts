import { BookmarkCountByPostHandler } from './bookmark-count-by-post/bookmark-count-by-post.handler';
import { CheckRepeatedBookmarkByUserHandler } from './check-repeated-bookmark-by-user/check-repeated-bookmark-by-user.handler';
import { FindBookmarkByIdHandler } from './find-bookmark-by-id/find-bookmark-by-id.handler';
import { FindBookmarkByIdsHandler } from './find-bookmark-by-ids/find-bookmark-by-ids.handler';
import { FindBookmarkByPostHandler } from './find-bookmark-by-post/find-bookmark-by-post.handler';
import { GetBookmarksByUserHandler } from './get-bookmarks-by-user/get-bookmarks-by-user.handler';
import { SearchBookmarkHanler } from './search-bookmark/search-bookmark.handler';

export const BookmarkQueryHandlers = [
  FindBookmarkByIdHandler,
  FindBookmarkByIdsHandler,
  FindBookmarkByPostHandler,
  SearchBookmarkHanler,
  BookmarkCountByPostHandler,
  CheckRepeatedBookmarkByUserHandler,
  GetBookmarksByUserHandler,
];
