import { BadRequestException, Injectable } from '@nestjs/common';

import { COMMENT_ID_IS_NOT_CORRECT } from '../constant/error-message.constant';
import { CommentRepository } from '../comment.repository';

@Injectable()
export class CommentHelepr {
  constructor(private readonly repository: CommentRepository) {}

  async validateCommentId(id: string) {
    const business = await this.repository.findById(id);
    if (!business || business === null)
      throw new BadRequestException(COMMENT_ID_IS_NOT_CORRECT);
  }

  //   async validatePermissionName(name: string, permId: string | null) {
  //     const role = await this.repository.findOneItemByName(name, permId);
  //     if (role) throw new BadRequestException(BUSINESS_NAME_DUPLICATED);
  //   }

  //   async validatePermissionSlug(title: string, permId: string | null) {
  //     const role = await this.repository.findOneItemBySlug(title, permId);
  //     if (role) throw new BadRequestException(BUSINESS_SLUG_DUPLICATED);
  //   }
}
