// taxonomy-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateTaxonomyCommand } from '@/modules/taxonomy/command/create-taxonomy';
import {
  CreateTaxonomyInput,
  CreateTaxonomyOutput,
} from '@/modules/taxonomy/dto/create-taxonomy.dto';
import { TaxonomyHelper } from '@/modules/taxonomy/helper/taxonomy.helper';
import { Taxonomy } from '../model/taxonomy.model';
import { TaxonomyEntityFactory } from '../entity/taxonomy.factory';

@Injectable()
export class CreateTaxonomyUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly taxonomyHelper: TaxonomyHelper,
    private readonly taxonomyFactory: TaxonomyEntityFactory,
  ) {}

  async createTaxonomy(
    input: CreateTaxonomyInput,
  ): Promise<CreateTaxonomyOutput> {
    try {
      await this.taxonomyHelper.validateTaxonomy({
        slug: input.slug,
        parent: input.parent,
      });

      const taxonomy: Taxonomy = await this.commandBus.execute(
        new CreateTaxonomyCommand(input),
      );
      return {
        success: true,
        taxonomy: this.taxonomyFactory.create(taxonomy),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
