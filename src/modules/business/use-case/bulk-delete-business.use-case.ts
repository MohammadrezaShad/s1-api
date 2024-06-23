import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BulkDeleteBusinessCommand } from '../command/bulk-delete-business/bulk-delete-business.command';
import {
  BulkDeleteBusinessInput,
  DeleteBusinessOutput,
} from '../dto/delete-business.dto';
import { BusinessHelepr } from '../helper/business-helper';

@Injectable()
export class BulkDeleteBusinessUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly businessHelepr: BusinessHelepr,
  ) {}

  async bulkDeleteBusiness(
    input: BulkDeleteBusinessInput,
  ): Promise<DeleteBusinessOutput> {
    try {
      for (const id of input.ids) {
        await this.businessHelepr.validateBusinessId(id);
      }
      await this.commandBus.execute(new BulkDeleteBusinessCommand(input));

      for (const id of input.ids) {
        await this.businessHelepr.deleteBookmarks(id);
        await this.businessHelepr.deleteFavorites(id);
        await this.businessHelepr.deleteReview(id);
        await this.businessHelepr.deleteQuestions(id);
      }
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
