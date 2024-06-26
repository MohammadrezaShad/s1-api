import { toPersianDate } from '@/common/middleware/to-persian-date.middleware';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('UserOutputInputType', { isAbstract: true })
@ObjectType('UserOutputType')
export class UserOutput {
  @Field(type => String)
  _id: string;

  @Field(type => String, { nullable: true })
  displayName?: string;

  @Field(type => String, { nullable: true })
  email?: string;

  @Field(type => String, { nullable: true })
  phone?: string;

  @Field(type => Boolean, { nullable: true })
  isVerified?: boolean;

  @Field(type => [String])
  roles?: string[];

  @Field(type => String, { nullable: true })
  country?: string;

  @Field(type => String, { nullable: true })
  city?: string;

  @Field(type => String, { nullable: true })
  address?: string;

  @Field(type => String, { nullable: true, middleware: [toPersianDate] })
  createdAt?: Date;

  @Field(type => String, { nullable: true, middleware: [toPersianDate] })
  updatedAt?: Date;
}
