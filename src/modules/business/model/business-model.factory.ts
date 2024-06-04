import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';

import { BusinessRepository } from '../business.repository';
import { CreateBusinessInput } from '../dto/create-business.dto';
import { BusinessModel } from './business.model';

@Injectable()
export class BusinessModelFactory implements ModelFactory<BusinessModel> {
  constructor(private readonly businessRepository: BusinessRepository) {}

  async create({
    name,
    slug,
    email,
    phone,
    address,
    address2,
    description,
    webAddress,
    dailyWorkTime,
    lat,
    long,
    taxonomies,
    thumbnail,
    images,
  }: CreateBusinessInput): Promise<BusinessModel> {
    const business = new BusinessModel(
      new ObjectId().toHexString(),
      name,
      slug,
      email,
      phone,
      address,
      address2,
      description,
      webAddress,
      dailyWorkTime,
      lat,
      long,
      taxonomies,
      thumbnail,
      images,
    );
    await this.businessRepository.create(business);
    return business;
  }
}
