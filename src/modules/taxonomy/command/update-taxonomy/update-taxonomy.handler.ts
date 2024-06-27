import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { UpdateTaxonomyCommand } from '@/modules/taxonomy/command/update-taxonomy/update-taxonomy.command';
import { TaxonomyRepository } from '@/modules/taxonomy/taxonomy.repository';
import { Taxonomy } from '../../model/taxonomy.model';

@CommandHandler(UpdateTaxonomyCommand)
export class UpdateTaxonomyHandler
  implements ICommandHandler<UpdateTaxonomyCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly taxonomyRepository: TaxonomyRepository,
  ) {}

  async execute({ data }: UpdateTaxonomyCommand): Promise<Taxonomy> {
    const taxonomy = await this.taxonomyRepository.findById({ id: data.id });
    taxonomy.updateTaxonomy(data);
    const tax = await this.taxonomyRepository.update(taxonomy);
    return tax;
  }
}
