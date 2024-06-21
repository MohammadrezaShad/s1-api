import { CreateQuestionInput } from '../../dto/create-question.dto';

export class CreateQuestionCommand {
  constructor(public readonly createQuestionInput: CreateQuestionInput) {}
}
