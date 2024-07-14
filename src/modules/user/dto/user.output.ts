import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { toPersianDate } from '@/common/middleware/to-persian-date.middleware';

@InputType('UserOutputInputType', { isAbstract: true })
@ObjectType('UserOutputType')
export class UserOutput {
  @Field(() => String)
  _id: string;

  @Field(() => String, { nullable: true })
  displayName?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => Boolean, { nullable: true })
  isVerified?: boolean;

  @Field(() => [String])
  roles?: string[];

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: true, middleware: [toPersianDate] })
  createdAt?: Date;

  @Field(() => String, { nullable: true, middleware: [toPersianDate] })
  updatedAt?: Date;
}
