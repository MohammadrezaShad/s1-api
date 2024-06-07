import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';
import { BookmarkEntity } from '../entity/bookmark.entity';
import { CollectionName } from '@/common/enums/collection-name.enum';

@InputType()
export class FindBookmarkInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class FindBookmarksInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType()
export class FindBookmarkOutput extends CoreOutput {
  @Field(() => BookmarkEntity, { nullable: true })
  @IsOptional()
  result?: BookmarkEntity;
}

@ObjectType()
export class FindBookmarksOutput extends CoreOutput {
  @Field(() => [BookmarkEntity], { nullable: true })
  @IsOptional()
  results?: BookmarkEntity[];
}

@InputType()
export class FindRepeatedBookmarkInput {
  @Field(() => String)
  post: string;
  user?: string;
  type?: CollectionName;
}

export class FindBookmarksByUserInput {
  posts: string[];
  user: string;
}
