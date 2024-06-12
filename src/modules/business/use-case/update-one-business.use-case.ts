import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateOneBusinessCommand } from '@/modules/business/command/update-one-business/update-one-business.command';

import { UpdateBusinessCommand } from '../command/update-business/update-business.command';
import {
  UpdateBusinessInput,
  UpdateBusinessOutput,
} from '../dto/update-business.dto';
import { BusinessHelepr } from '../helper/business-helper';

@Injectable()
export class UpdateOneBusinessUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly businessHelepr: BusinessHelepr,
  ) {}

  async updateOneBusiness(
    input: UpdateBusinessInput,
  ): Promise<UpdateBusinessOutput> {
    try {
      await this.businessHelepr.validateBusinessId(input.id);
      await this.businessHelepr.validateBusinessName(input.name, input.id);
      await this.businessHelepr.validateBusinessSlug(input.slug, input.id);
      for (const it of input.taxonomies || []) {
        await this.businessHelepr.validateTaxonomy(it);
      }
      await this.commandBus.execute(new UpdateOneBusinessCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
