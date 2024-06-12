import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { IsObjectId } from '@/common/decorators/is-object-id.decorator';
import { CoreOutput } from '@/common/dtos/output.dto';

@InputType()
export class DeleteBusinessInput {
  @Field(() => String)
  @IsObjectId()
  id: string;

  user?: string;
}

@InputType()
export class BulkDeleteBusinessInput {
  @Field(() => [String])
  @IsObjectId({ each: true })
  ids: string[];
}

@ObjectType()
export class DeleteBusinessOutput extends CoreOutput {}
