import { DeleteAnswerInput } from '../../dto/delete-answer.dto';

export class DeleteAnswerCommand {
  constructor(public readonly deleteAnswerInput: DeleteAnswerInput) {}
}
