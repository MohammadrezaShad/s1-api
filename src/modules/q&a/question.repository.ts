import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PipelineStage } from 'mongoose';

import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from '@/common/constants/pagination.constant';
import { BooleanEnum } from '@/common/enums/boolean.enum';

import {
  SearchQuestionInput,
  SearchQuestionOutput,
} from './dto/search-question.dto';
import { UpdateQuestionInput } from './dto/update-question.dto';
import { QuestionEntity, TQuestionEntity } from './entity/question.entity';
import { QuestionEntityFactory } from './entity/question.factory';
import { QuestionModel } from './model/question.model';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectModel(QuestionEntity.name)
    private readonly questionModel: Model<TQuestionEntity>,
    protected readonly questionEntityFactory: QuestionEntityFactory,
  ) {}

  async search({
    count: inputCount,
    page: inputPage,
    business,
    approved,
    user,
  }: SearchQuestionInput): Promise<SearchQuestionOutput> {
    const count = inputCount || DEFAULT_COUNT;
    const page = inputPage || DEFAULT_PAGE;
    const questionApproved =
      approved || approved === null ? approved : BooleanEnum.TRUE;
    const pipeline: PipelineStage[] = [
      {
        $match: {
          ...(questionApproved && { approved: questionApproved }),
          ...(business && { business }),
          ...(user && { createUser: user }),
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
    const searchResults = await this.questionModel.aggregate(pipeline);
    const [finalResults = {}] = searchResults;
    const totalCount = finalResults.totalCount?.[0]?.count || 0;

    return {
      success: true,
      results: finalResults.results,
      totalCount,
      totalPages: Math.ceil(totalCount / inputCount),
    };
  }

  async findById(id: string): Promise<QuestionModel | null> {
    const question = await this.questionModel.findById(id).exec();
    return this.questionEntityFactory.createFromEntity(question);
  }

  async findManyById(ids: string[]): Promise<QuestionModel[]> {
    const items = await this.questionModel.find({ _id: { $in: ids } }).exec();
    const questionModel: QuestionModel[] = [];
    items.map(it => {
      questionModel.push(this.questionEntityFactory.createFromEntity(it));
    });
    return questionModel;
  }

  async findManyQuestionByBusiness(business: string): Promise<QuestionModel[]> {
    const questions = await this.questionModel
      .find({ business: business })
      .exec();
    const questionModel: QuestionModel[] = [];
    questions.map(it => {
      questionModel.push(this.questionEntityFactory.createFromEntity(it));
    });
    return questionModel;
  }

  async createQuestion(input: QuestionModel): Promise<void> {
    const newQuestion = new this.questionModel(input);
    newQuestion.user = input.getUser();
    newQuestion.approved = BooleanEnum.TRUE; // Here approved most be removed
    await newQuestion.save();
  }

  async update({
    id,
    ...restOfArgs
  }: UpdateQuestionInput): Promise<QuestionEntity | null> {
    const review = await this.questionModel
      .findByIdAndUpdate(
        id,
        { ...restOfArgs, approved: BooleanEnum.TRUE }, // Here approved most be removed
        { new: true },
      )
      .exec();
    return review;
  }

  async delete(id: string): Promise<void> {
    await this.questionModel.findByIdAndDelete(id).exec();
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    const wereRemoved = await this.questionModel.deleteMany({
      _id: { $in: ids },
    });
    return wereRemoved.acknowledged;
  }

  async questionCountByBusiness(businessId: string) {
    const questionCount = await this.questionModel
      .findOne({ business: businessId, approved: BooleanEnum.TRUE })
      .countDocuments()
      .exec();
    return questionCount;
  }
}
