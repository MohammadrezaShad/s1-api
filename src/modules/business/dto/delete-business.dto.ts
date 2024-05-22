import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';

@InputType()
export class DeleteBusinessInput {
  @Field(() => String)
  @IsObjectId()
  id: string;
}

@InputType()
export class BulkDeleteBusinessInput {
  @Field(() => [String])
  @IsObjectId({ each: true })
  ids: string[];
}

@ObjectType()
export class DeleteBusinessOutput extends CoreOutput {}
