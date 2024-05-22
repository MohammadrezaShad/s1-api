import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  DeleteBusinessInput,
  DeleteBusinessOutput,
} from '../dto/delete-business.dto';
import { DeleteBusinessCommand } from '../command/delete-business/delete-business.command';
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
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
