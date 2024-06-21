import { DeleteQuestionsInput } from '../../dto/delete-question.dto';

export class BulkDeleteQuestionCommand {
  constructor(public readonly deleteQuestionsInput: DeleteQuestionsInput) {}
}
