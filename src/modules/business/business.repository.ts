import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';

import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from '@/common/constants/pagination.constant';
import { escapeRegex } from '@/common/utils/escape-regx.util';
import { BusinessEntity, TBusiness } from './entity/business.entity';
import { BusinessEntityFactory } from './entity/business.factory';
import {
  FindBusinessByIdInput,
  FindBusinessByIdsInput,
} from './dto/find-business.dto';
import { BusinessModel } from './model/business.model';
import {
  SearchBusinessInput,
  SearchBusinessOutput,
} from './dto/search-business.dto';
import { UpdateBusinessInput } from './dto/update-business.dto';
import { DeleteBusinessInput } from './dto/delete-business.dto';

@Injectable()
export class BusinessRepository {
  constructor(
    @InjectModel(BusinessEntity.name)
    private readonly businessModel: Model<TBusiness>,
    protected readonly businessEntityFactory: BusinessEntityFactory,
  ) {}

  public async findById({
    id,
  }: FindBusinessByIdInput): Promise<BusinessModel | null> {
    const business = await this.businessModel.findById(id).exec();
    return this.businessEntityFactory.createFromEntity(business);
  }

  async findByIds({ ids }: FindBusinessByIdsInput): Promise<BusinessModel[]> {
    const items = await this.businessModel.find({ _id: { $in: ids } }).exec();
    const businessModel: BusinessModel[] = [];
    items.map(it => {
      businessModel.push(this.businessEntityFactory.createFromEntity(it));
    });
    return businessModel;
  }

  public async findOneItemByName(
    name: string,
    id: string | null,
  ): Promise<BusinessModel | null> {
    const role = await this.businessModel.findOne({
      $and: [{ name: name }, { _id: { $ne: id } }],
    });
    return this.businessEntityFactory.createFromEntity(role);
  }

  public async findOneItemBySlug(
    slug: string,
    id: string | null,
  ): Promise<BusinessModel | null> {
    const role = await this.businessModel.findOne({
      $and: [{ slug: slug }, { _id: { $ne: id } }],
    });
    return this.businessEntityFactory.createFromEntity(role);
  }

  async search({
    count: inputCount,
    page: inputPage,
    text,
  }: SearchBusinessInput): Promise<SearchBusinessOutput> {
    const count = inputCount || DEFAULT_COUNT;
    const page = inputPage || DEFAULT_PAGE;

    const safeText = text ? escapeRegex(text) : text;

    const pipeline: PipelineStage[] = [
      {
        $match: {
          ...(text && {
            $or: [{ $text: { $search: text } }],
          }),
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $facet: {
          results: [{ $skip: (page - 1) * count }, { $limit: count }],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ];

    const searchResults = await this.businessModel.aggregate(pipeline);
    const [finalResults = {}] = searchResults;
    const totalCount = finalResults.totalCount?.[0]?.count || 0;

    return {
      success: true,
      results: finalResults.results,
      totalCount,
      totalPages: Math.ceil(totalCount / inputCount),
    };
  }

  public async create(businessInput: BusinessModel): Promise<void> {
    const business = new this.businessModel(
      this.businessEntityFactory.create(businessInput),
    );
    await business.save();
  }

  public async update({
    id,
    ...restOfArgs
  }: UpdateBusinessInput): Promise<void> {
    await this.businessModel
      .findByIdAndUpdate(id, { ...restOfArgs }, { new: true })
      .exec();
  }

  public async delete({ id }: DeleteBusinessInput): Promise<void> {
    await this.businessModel.findByIdAndDelete(id).exec();
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    const wereRemoved = await this.businessModel.deleteMany({
      _id: { $in: ids },
    });
    return wereRemoved.acknowledged;
  }
}
