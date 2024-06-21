import { DeleteQuestionInput } from '../../dto/delete-question.dto';

export class DeleteQuestionCommand {
  constructor(public readonly deleteQuestionInput: DeleteQuestionInput) {}
}
