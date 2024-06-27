// taxonomy-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { UpdateTaxonomyCommand } from '@/modules/taxonomy/command/update-taxonomy';
import {
  UpdateTaxonomyInput,
  UpdateTaxonomyOutput,
} from '@/modules/taxonomy/dto/update-taxonomy.dto';
import { TaxonomyHelper } from '@/modules/taxonomy/helper/taxonomy.helper';
import { Taxonomy } from '../model/taxonomy.model';
import { TaxonomyEntityFactory } from '../entity/taxonomy.factory';

@Injectable()
export class UpdateTaxonomyUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly taxonomyHelper: TaxonomyHelper,
    private readonly taxonomyFactory: TaxonomyEntityFactory,
  ) {}

  async updateTaxonomy(
    input: UpdateTaxonomyInput,
  ): Promise<UpdateTaxonomyOutput> {
    try {
      await this.taxonomyHelper.validateTaxonomyUpdate({
        id: input.id,
        slug: input.slug,
        parent: input.parent,
      });
      const taxonomy: Taxonomy = await this.commandBus.execute(
        new UpdateTaxonomyCommand(input),
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
