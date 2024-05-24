import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  SearchCommentInput,
  SearchCommentOutput,
} from '../dto/search-comment.dto';
import { SearchCommentQuery } from '../query/search-comment/search-business.query';

@Injectable()
export class SearchCommentUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async search(
    searchCommentInput: SearchCommentInput,
  ): Promise<SearchCommentOutput> {
    try {
      const { results, success, totalCount, totalPages }: SearchCommentOutput =
        await this.queryBus.execute(new SearchCommentQuery(searchCommentInput));
      return {
        success,
        results: results,
        totalCount,
        totalPages,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
