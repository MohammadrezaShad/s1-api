import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { CreateBookmarkInput } from '@/modules/bookmark/dto/create-bookmark.dto';

@InputType()
export class UpdateBookmarkInput extends PartialType(CreateBookmarkInput) {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class UpdateBookmarkOutput extends CoreOutput {}
