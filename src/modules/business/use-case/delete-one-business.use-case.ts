import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteOneBusinessCommand } from '@/modules/business/command/delete-one-business/delete-one-business.command';

import {
  DeleteBusinessInput,
  DeleteBusinessOutput,
} from '../dto/delete-business.dto';
import { BusinessHelepr } from '../helper/business-helper';

@Injectable()
export class DeleteOneBusinessUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly businessHelepr: BusinessHelepr,
  ) {}

  async deleteOneBusiness(
    input: DeleteBusinessInput,
  ): Promise<DeleteBusinessOutput> {
    try {
      await this.businessHelepr.validateBusinessId(input.id);

      await this.commandBus.execute(new DeleteOneBusinessCommand(input));

      await this.businessHelepr.deleteBookmarks(input.id);
      await this.businessHelepr.deleteFavorites(input.id);
      await this.businessHelepr.deleteReview(input.id);

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
