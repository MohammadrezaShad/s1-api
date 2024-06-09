import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';

import { CommentRepository } from '../comment.repository';
import { CreateCommentInput } from '../dto/create-comment.dto';
import { CommentModel } from './comment.model';

@Injectable()
export class CommentModelFactory implements ModelFactory<CommentModel> {
  constructor(private readonly commentRepository: CommentRepository) {}

  async create({
    content,
    post,
    type,
    authorEmail,
    author,
    parent,
    user,
  }: CreateCommentInput): Promise<CommentModel> {
    const comment = new CommentModel(
      new ObjectId().toHexString(),
      content,
      post,
      type,
      authorEmail,
      author,
      user,
      parent,
    );
    await this.commentRepository.createComment(comment);
    return comment;
  }
}
