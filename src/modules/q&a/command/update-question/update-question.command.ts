import { UpdateQuestionInput } from '../../dto/update-question.dto';

export class UpdateQuestionCommand {
  constructor(public readonly updateQuestionInput: UpdateQuestionInput) {}
}
