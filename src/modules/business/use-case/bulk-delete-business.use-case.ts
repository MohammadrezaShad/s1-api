// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BusinessHelepr } from '../helper/business-helper';
import {
  BulkDeleteBusinessInput,
  DeleteBusinessOutput,
} from '../dto/delete-business.dto';
import { BulkDeleteBusinessCommand } from '../command/bulk-delete-business/bulk-delete-business.command';

@Injectable()
export class BulkDeletebusinessUseCase {
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
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
