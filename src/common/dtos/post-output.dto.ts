import { Field, ObjectType } from '@nestjs/graphql';

import { BusinessEntity } from '@/modules/business/entity/business.entity';

@ObjectType('PostOutput')
export class PostOutput {
  @Field(type => BusinessEntity, { nullable: true })
  businessEntity?: BusinessEntity;
}
