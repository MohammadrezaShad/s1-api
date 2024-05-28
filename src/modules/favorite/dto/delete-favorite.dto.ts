import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';

@InputType()
export class DeleteFavoriteInput {
  @Field(() => String)
  @IsString()
  id: number;
}

@InputType()
export class DeleteOneFavoriteInput {
  @Field(() => String)
  @IsString()
  postId: string;

  user?: string;
  clientId?: string;
}

@InputType()
export class DeleteFavoritesInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType()
export class DeleteFavoriteOutput extends CoreOutput {}