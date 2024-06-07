import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';

import { CollectionName } from '@/common/enums/collection-name.enum';
import { BookmarkEntity } from '../entity/bookmark.entity';

@InputType()
export class SearchBookmarkInput extends PaginationInput {
  @Field(type => CollectionName, { nullable: true })
  type?: CollectionName;
}

@ObjectType()
export class SearchBookmarkOutput extends PaginationOutput {
  @Field(() => [BookmarkEntity], { nullable: true })
  results?: BookmarkEntity[];
}
