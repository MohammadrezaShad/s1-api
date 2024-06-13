import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  CreateBusinessInput,
  CreateBusinessOutput,
} from '../dto/create-business.dto';
import { CreateBusinessCommand } from '../command/create-business/create-business.command';
import { BusinessHelepr } from '../helper/business-helper';

@Injectable()
export class CreateBusinessUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly businessHelepr: BusinessHelepr,
  ) {}

  async createBusiness(
    input: CreateBusinessInput,
  ): Promise<CreateBusinessOutput> {
    try {
      await this.businessHelepr.validateNumberOdUserBusiness(input.user);
      await this.businessHelepr.validateBusinessName(input.name, null);
      await this.businessHelepr.validateBusinessSlug(input.slug, null);
      for (const it of input.taxonomies || []) {
        await this.businessHelepr.validateTaxonomy(it);
      }

      const businessId: string = await this.commandBus.execute(
        new CreateBusinessCommand(input),
      );
      return { success: true, businessId: businessId };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
