import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { BookmarkModel } from './bookmark.model';
import { CreateBookmarkInput } from '../dto/create-bookmark.dto';
import { ModelFactory } from '@/common/repositories/model.factory';
import { BookmarkRepository } from '../bookmark.repository';

@Injectable()
export class BookmarkModelFactory implements ModelFactory<BookmarkModel> {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async create({
    post,
    user,
    type,
  }: CreateBookmarkInput): Promise<BookmarkModel> {
    const bookmark = new BookmarkModel(
      new ObjectId().toHexString(),
      post,
      user,
      type,
    );
    await this.bookmarkRepository.createBookmark(bookmark);
    return bookmark;
  }
}
