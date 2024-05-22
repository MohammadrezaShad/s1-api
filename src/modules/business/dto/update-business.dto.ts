import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

import { IsObjectId } from '@/common/decorators/is-object-id.decorator';
import { CoreOutput } from '@/common/dtos/output.dto';
import { CreateBusinessInput } from './create-business.dto';

@InputType()
export class UpdateBusinessInput extends PartialType(CreateBusinessInput) {
  @Field(() => String)
  @IsObjectId()
  id: string;
}

@ObjectType()
export class UpdateBusinessOutput extends CoreOutput {}
