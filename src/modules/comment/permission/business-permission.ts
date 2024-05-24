import { PermissionType } from '@/common/permissions/permission-type';

export class CommentPermission {
  static readonly CREATE_COMMENT: PermissionType = {
    name: 'createComment',
    title: 'ایجاد کامنت',
  };

  static readonly CREATE_ADMIN_COMMENT: PermissionType = {
    name: 'createَAdminComment',
    title: 'ایجاد کامنت ادمین',
  };

  static readonly UPDATE_COMMENT: PermissionType = {
    name: 'updateComment',
    title: 'آپدیت کامنت',
  };

  static readonly DELETE_COMMENT: PermissionType = {
    name: 'deleteComment',
    title: 'حذف کامنت',
  };

  static readonly BULK_DELETE_COMMENT: PermissionType = {
    name: 'bulkDeleteComment',
    title: 'حذف چندتایی کامنت',
  };
}
