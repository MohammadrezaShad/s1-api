import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';
import { CreateFavoriteInput } from '@/modules/favorite/dto/create-favorite.dto';
import { FavoriteModel } from '@/modules/favorite/model/favorite.model';

import { FavoriteRepository } from '../favorite.repository';

@Injectable()
export class FavoriteModelFactory implements ModelFactory<FavoriteModel> {
  constructor(private readonly favRepository: FavoriteRepository) {}

  async create({
    post,
    user,
    client,
    type,
  }: CreateFavoriteInput): Promise<FavoriteModel> {
    const favorite = new FavoriteModel(
      new ObjectId().toHexString(),
      post,
      user,
      client,
      type,
    );
    await this.favRepository.createFavorite(favorite);
    return favorite;
  }
}
