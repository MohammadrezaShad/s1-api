import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteBusinessCommand } from '../command/delete-business/delete-business.command';
import {
  DeleteBusinessInput,
  DeleteBusinessOutput,
} from '../dto/delete-business.dto';
import { BusinessHelepr } from '../helper/business-helper';

@Injectable()
export class DeleteBusinessUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly businessHelepr: BusinessHelepr,
  ) {}

  async deleteBusiness(
    input: DeleteBusinessInput,
  ): Promise<DeleteBusinessOutput> {
    try {
      await this.businessHelepr.validateBusinessId(input.id);

      await this.commandBus.execute(new DeleteBusinessCommand(input));

      await this.businessHelepr.deleteBookmarks(input.id);
      await this.businessHelepr.deleteFavorites(input.id);
      await this.businessHelepr.deleteComments(input.id);

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
