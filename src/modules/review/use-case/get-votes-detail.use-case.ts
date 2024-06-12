import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetVotesDetailInput, VotesDetail } from '../dto/votes-detail.dto';
import { GetVotesDetailQuery } from '../query/get-votes-detail/get-votes-detail.query';

@Injectable()
export class GetVotesDetailUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async getVotesDetail(input: GetVotesDetailInput): Promise<VotesDetail[]> {
    try {
      const votesDetail: VotesDetail[] = await this.queryBus.execute(
        new GetVotesDetailQuery(input),
      );
      return votesDetail;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
