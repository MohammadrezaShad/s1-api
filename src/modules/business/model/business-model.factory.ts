import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';
import { BusinessModel } from './business.model';
import { BusinessRepository } from '../business.repository';
import { CreateBusinessInput } from '../dto/create-business.dto';

@Injectable()
export class BusinessModelFactory implements ModelFactory<BusinessModel> {
  constructor(private readonly businessRepository: BusinessRepository) {}

  async create({
    name,
    slug,
    email,
    phone,
    address,
    hoursOfWork,
    lat,
    long,
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
      hoursOfWork,
      lat,
      long,
      thumbnail,
      images,
    );
    await this.businessRepository.create(business);
    return business;
  }
}
