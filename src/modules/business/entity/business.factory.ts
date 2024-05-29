import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelEntityFactory } from '@/common/repositories/model-entity';

import { BusinessModel } from '../model/business.model';
import { BusinessEntity } from './business.entity';

@Injectable()
export class BusinessEntityFactory
  implements ModelEntityFactory<BusinessEntity, BusinessModel>
{
  create(business: BusinessModel): BusinessEntity | null {
    if (!business) return null;
    return {
      _id: new ObjectId(business.getId()),
      name: business.getName(),
      slug: business.getSlug(),
      email: business.getEmail(),
      phone: business.getPhone(),
      address: business.getAddress(),
      address2: business.getAddress2(),
      description: business.getDescription(),
      webAddress: business.getWebAddress(),
      hoursOfWork: business.getHoursOfWork(),
      lat: business.getLat(),
      long: business.getLong(),
      thumbnail: business.getThumbnail(),
      images: business.getImages(),
    };
  }

  createFromEntity(businessEntity: BusinessEntity): BusinessModel | null {
    if (!businessEntity) return null;
    const {
      _id,
      name,
      slug,
      email,
      phone,
      address,
      address2,
      description,
      webAddress,
      hoursOfWork,
      lat,
      long,
      thumbnail,
      images,
    } = businessEntity;
    return new BusinessModel(
      _id.toHexString(),
      name,
      slug,
      email,
      phone,
      address,
      address2,
      description,
      webAddress,
      hoursOfWork,
      lat,
      long,
      thumbnail,
      images,
    );
  }
}
