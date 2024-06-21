import { DeleteManyAnswerInput } from '../../dto/delete-answer.dto';

export class BulkDeleteAnswerCommand {
  constructor(public readonly deleteManyAnswerInput: DeleteManyAnswerInput) {}
}
