import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ReviewRepository } from '../../review.repository';
import { GetVotesDetailQuery } from './get-votes-detail.query';
import { VotesDetail } from '../../dto/votes-detail.dto';

@QueryHandler(GetVotesDetailQuery)
export class GetVotesDetailHandler
  implements IQueryHandler<GetVotesDetailQuery>
{
  constructor(private readonly repository: ReviewRepository) {}

  async execute({
    getVotesDetailInput,
  }: GetVotesDetailQuery): Promise<VotesDetail[]> {
    return this.repository.getVotesDetail({ type: getVotesDetailInput.type });
  }
}
