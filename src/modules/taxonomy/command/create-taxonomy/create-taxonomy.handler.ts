import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateTaxonomyCommand } from '@/modules/taxonomy/command/create-taxonomy/create-taxonomy.command';
import { TaxonomyFactory } from '@/modules/taxonomy/model/taxonomy-model.factory';
import { TaxonomyRepository } from '@/modules/taxonomy/taxonomy.repository';
import { Taxonomy } from '../../model/taxonomy.model';

@CommandHandler(CreateTaxonomyCommand)
export class CreateTaxonomyHandler
  implements ICommandHandler<CreateTaxonomyCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly taxonomyFactory: TaxonomyFactory,
  ) {}

  async execute({ data }: CreateTaxonomyCommand): Promise<Taxonomy> {
    const taxonomy = this.publisher.mergeObjectContext(
      await this.taxonomyFactory.create(data),
    );
    taxonomy.commit();
    return taxonomy;
  }
}
