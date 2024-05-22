import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { IsObjectId } from '@/common/decorators/is-object-id.decorator';
import { CoreOutput } from '@/common/dtos/output.dto';
import { BusinessEntity } from '../entity/business.entity';

@InputType()
export class FindBusinessByIdInput {
  @Field(() => String)
  @IsObjectId()
  id: string;
}

@InputType()
export class FindBusinessByIdsInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType()
export class FindBusinessOutput extends CoreOutput {
  @Field(() => BusinessEntity, { nullable: true })
  result?: BusinessEntity;
}

@ObjectType()
export class FindManyBusinessOutput extends CoreOutput {
  @Field(() => [BusinessEntity], { nullable: true })
  results?: BusinessEntity[];
}
