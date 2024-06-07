import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindRepeatedBookmarkInput } from '../dto/find-bookmark.dto';
import { FindRepeatedBookmarkQuery } from '../query/check-repeated-bookmark-by-user/check-repeated-bookmark-by-user.query';

@Injectable()
export class CheckRepeatedBookmarkByUserUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async checkRepeatedBookmarkByUser(
    findRepeatedBookmarkInput: FindRepeatedBookmarkInput,
  ): Promise<boolean> {
    try {
      const isRepeated: boolean = await this.queryBus.execute(
        new FindRepeatedBookmarkQuery(findRepeatedBookmarkInput),
      );
      return isRepeated;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
