import { CreateAnswerInput } from '../../dto/create-answer.dto';

export class CreateAnswerCommand {
  constructor(public readonly createAnswerInput: CreateAnswerInput) {}
}
