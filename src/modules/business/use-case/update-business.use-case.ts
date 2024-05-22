import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import {
  UpdateBusinessInput,
  UpdateBusinessOutput,
} from '../dto/update-business.dto';
import { UpdateBusinessCommand } from '../command/update-business/update-business.command';
import { BusinessHelepr } from '../helper/business-helper';

@Injectable()
export class UpdateBusinessUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly businessHelepr: BusinessHelepr,
  ) {}

  async updateBusiness(
    input: UpdateBusinessInput,
  ): Promise<UpdateBusinessOutput> {
    try {
      await this.businessHelepr.validateBusinessId(input.id);
      await this.businessHelepr.validatePermissionName(input.name, input.id);
      await this.businessHelepr.validatePermissionSlug(input.slug, input.id);
      await this.commandBus.execute(new UpdateBusinessCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
