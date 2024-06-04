import { BadRequestException, Injectable } from '@nestjs/common';

import { BusinessRepository } from '../business.repository';
import {
  BUSINESS_ID_IS_NOT_CORRECT,
  BUSINESS_NAME_DUPLICATED,
  BUSINESS_SLUG_DUPLICATED,
} from '../constant/error-message.constant';
import { FindTaxonomyByIdUseCase } from '@/modules/taxonomy/use-case/find-taxonomy.use-case';

@Injectable()
export class BusinessHelepr {
  constructor(
    private readonly repository: BusinessRepository,
    private readonly findTaxonomyByIdUseCase: FindTaxonomyByIdUseCase,
  ) {}

  async validateBusinessId(id: string) {
    const business = await this.repository.findById({ id: id });
    if (!business || business === null)
      throw new BadRequestException(BUSINESS_ID_IS_NOT_CORRECT);
  }

  async validateBusinessName(name: string, id: string | null) {
    const role = await this.repository.findOneItemByName(name, id);
    if (role) throw new BadRequestException(BUSINESS_NAME_DUPLICATED);
  }

  async validateBusinessSlug(title: string, id: string | null) {
    const role = await this.repository.findOneItemBySlug(title, id);
    if (role) throw new BadRequestException(BUSINESS_SLUG_DUPLICATED);
  }

  async validateTaxonomy(id: string) {
    await this.findTaxonomyByIdUseCase.findTaxonomyById(id);
  }
}
