import { Field, ObjectType } from '@nestjs/graphql';

import { BusinessEntity } from '@/modules/business/entity/business.entity';
import { ReviewEntity } from '@/modules/review/entity/review.entity';

@ObjectType('PostOutput')
export class PostOutput {
  @Field(() => BusinessEntity, { nullable: true })
  businessEntity?: BusinessEntity;

  @Field(() => ReviewEntity, { nullable: true })
  reviewEntity?: ReviewEntity;
}
