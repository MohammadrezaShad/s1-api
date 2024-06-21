import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PipelineStage } from 'mongoose';

import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from '@/common/constants/pagination.constant';
import { BooleanEnum } from '@/common/enums/boolean.enum';

import { SearchAnswerInput, SearchAnswerOutput } from './dto/search-answer.dto';
import { AnswerEntityFactory } from './entity/answer.factory';
import { AnswerModel } from './model/answer.model';
import { AnswerEntity, TAnswerEntity } from './entity/answer.entity';
import { UpdateAnswerInput } from './dto/update-answer.dto';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectModel(AnswerEntity.name)
    private readonly answerModel: Model<TAnswerEntity>,
    protected readonly answerEntityFactory: AnswerEntityFactory,
  ) {}

  async search({
    count: inputCount,
    page: inputPage,
    question,
    approved,
    user,
  }: SearchAnswerInput): Promise<SearchAnswerOutput> {
    const count = inputCount || DEFAULT_COUNT;
    const page = inputPage || DEFAULT_PAGE;
    const answerApproved =
      approved || approved === null ? approved : BooleanEnum.TRUE;
    const pipeline: PipelineStage[] = [
      {
        $match: {
          ...(answerApproved && { approved: answerApproved }),
          ...(question && { question }),
          ...(user && { user: user }),
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $facet: {
          results: [{ $skip: (page - 1) * count }, { $limit: count }],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ];
    const searchResults = await this.answerModel.aggregate(pipeline);
    const [finalResults = {}] = searchResults;
    const totalCount = finalResults.totalCount?.[0]?.count || 0;

    return {
      success: true,
      results: finalResults.results,
      totalCount,
      totalPages: Math.ceil(totalCount / inputCount),
    };
  }

  async findById(id: string): Promise<AnswerModel | null> {
    const answer = await this.answerModel.findById(id).exec();
    return this.answerEntityFactory.createFromEntity(answer);
  }

  async findManyById(ids: string[]): Promise<AnswerModel[]> {
    const items = await this.answerModel.find({ _id: { $in: ids } }).exec();
    const answerModel: AnswerModel[] = [];
    items.map(it => {
      answerModel.push(this.answerEntityFactory.createFromEntity(it));
    });
    return answerModel;
  }

  async findManyAnswerByQuestion(question: string): Promise<AnswerModel[]> {
    const answers = await this.answerModel.find({ question: question }).exec();
    const answerModel: AnswerModel[] = [];
    answers.map(it => {
      answerModel.push(this.answerEntityFactory.createFromEntity(it));
    });
    return answerModel;
  }

  async createAnswer(input: AnswerModel): Promise<void> {
    const newReview = new this.answerModel(input);
    newReview.user = input.getUser();
    await newReview.save();
  }

  async update({
    id,
    ...restOfArgs
  }: UpdateAnswerInput): Promise<AnswerEntity | null> {
    const review = await this.answerModel
      .findByIdAndUpdate(id, { ...restOfArgs }, { new: true })
      .exec();
    return review;
  }

  async delete(id: string): Promise<void> {
    await this.answerModel.findByIdAndDelete(id).exec();
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    const wereRemoved = await this.answerModel.deleteMany({
      _id: { $in: ids },
    });
    return wereRemoved.acknowledged;
  }

  async answerCountByQuestion(questionId: string) {
    const answerCount = await this.answerModel
      .findOne({ question: questionId, approved: BooleanEnum.TRUE })
      .countDocuments()
      .exec();
    return answerCount;
  }
}
