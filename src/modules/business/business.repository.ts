import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';

import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from '@/common/constants/pagination.constant';
import { ObjectId } from 'mongodb';

import { DeleteBusinessInput } from './dto/delete-business.dto';
import {
  FindBusinessByIdInput,
  FindBusinessByIdsInput,
} from './dto/find-business.dto';
import {
  SearchBusinessInput,
  SearchBusinessOutput,
} from './dto/search-business.dto';
import { UpdateBusinessInput } from './dto/update-business.dto';
import { BusinessEntity, TBusiness } from './entity/business.entity';
import { BusinessEntityFactory } from './entity/business.factory';
import { BusinessModel } from './model/business.model';
import { BusinessStatus } from './enum/status.enum';

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

  async findByUser(user: string): Promise<BusinessModel[]> {
    const items = await this.businessModel.find({ user: user }).exec();
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
    user,
    taxonomies,
    ninId,
    status: inputStatus,
  }: SearchBusinessInput): Promise<SearchBusinessOutput> {
    const count = inputCount || DEFAULT_COUNT;
    const page = inputPage || DEFAULT_PAGE;

    const status =
      inputStatus || inputStatus === null
        ? inputStatus
        : BusinessStatus.PUBLISH;

    const pipeline: PipelineStage[] = [
      {
        $match: {
          ...(text && {
            $or: [{ $text: { $search: text } }],
          }),
          ...(user && { user: user }),
          ...(taxonomies && { taxonomies: { $in: taxonomies } }),
          ...(ninId && { _id: { $ne: new ObjectId(ninId) } }),
          ...(status && { status: status }),
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

  public async create(businessInput: BusinessModel): Promise<BusinessEntity> {
    const business = new this.businessModel(
      this.businessEntityFactory.create(businessInput),
    );
    await business.save();
    return business;
  }

  public async update({
    id,
    ...restOfArgs
  }: UpdateBusinessInput): Promise<void> {
    await this.businessModel
      .findByIdAndUpdate(id, { ...restOfArgs }, { new: true })
      .exec();
  }

  public async updateOne({
    id,
    user,
    name,
    slug,
    email,
    phone,
    address,
    address2,
    description,
    webAddress,
    workHour,
    lat,
    long,
    taxonomies,
    thumbnail,
    images,
    amenities,
    status,
  }: UpdateBusinessInput): Promise<void> {
    await this.businessModel
      .findOneAndUpdate(
        { _id: id, user: user },
        {
          name,
          slug,
          email,
          phone,
          address,
          address2,
          description,
          webAddress,
          workHour,
          lat,
          long,
          taxonomies,
          thumbnail,
          images,
          amenities,
          status,
        },
        { new: true },
      )
      .exec();
  }

  public async delete({ id }: DeleteBusinessInput): Promise<void> {
    await this.businessModel.findByIdAndDelete(id).exec();
  }

  public async deleteOne({ id, user }: DeleteBusinessInput): Promise<void> {
    await this.businessModel
      .findOneAndDelete({
        $and: [{ _id: { $eq: id } }, { user: { $eq: user } }],
      })
      .exec();
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    const wereRemoved = await this.businessModel.deleteMany({
      _id: { $in: ids },
    });
    return wereRemoved.acknowledged;
  }
}
