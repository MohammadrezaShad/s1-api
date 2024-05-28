import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';

import { CollectionName } from '@/common/enums/collection-name.enum';
import { FavoriteEntity } from '@/modules/favorite/entity/favorite.entity';

@InputType()
export class SearchFavoriteInput extends PaginationInput {
  @Field(type => CollectionName, { nullable: true })
  type?: CollectionName;
}

@ObjectType()
export class SearchFavoriteOutput extends PaginationOutput {
  @Field(() => [FavoriteEntity], { nullable: true })
  results?: FavoriteEntity[];
}
