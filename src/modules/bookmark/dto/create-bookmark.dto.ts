import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { BookmarkEntity } from '../entity/bookmark.entity';

@InputType()
export class CreateBookmarkInput extends OmitType(BookmarkEntity, [
  '_id',
  'createdAt',
  'updatedAt',
  'post',
  'user',
] as const) {
  @Field(() => String)
  post: string;

  user?: string;
}

@ObjectType()
export class CreateBookmarkOutput extends CoreOutput {}
