import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { FavoriteEntity } from '@/modules/favorite/entity/favorite.entity';

@InputType()
export class FindFavoriteInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class FindFavoritesInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType()
export class FindFavoriteOutput extends CoreOutput {
  @Field(() => FavoriteEntity, { nullable: true })
  @IsOptional()
  result?: FavoriteEntity;
}

@ObjectType()
export class FindFavoritesOutput extends CoreOutput {
  @Field(() => [FavoriteEntity], { nullable: true })
  @IsOptional()
  results?: FavoriteEntity[];
}

@InputType()
export class FindRepeatedFavoriteInput {
  @Field(() => String)
  post: string;
  user?: string;
  type?: CollectionName;
}
