import { UpdateAnswerInput } from '../../dto/update-answer.dto';

export class UpdateAnswerCommand {
  constructor(public readonly updateAnswerInput: UpdateAnswerInput) {}
}
