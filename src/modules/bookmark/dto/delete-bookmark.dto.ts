import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';

@InputType()
export class DeleteBookmarkInput {
  @Field(() => String)
  @IsString()
  id: number;
}

@InputType()
export class DeleteOneBookmarkInput {
  @Field(() => String)
  @IsString()
  postId: string;

  user?: string;
}

@InputType()
export class DeleteBookmarksInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType()
export class DeleteBookmarkOutput extends CoreOutput {}
