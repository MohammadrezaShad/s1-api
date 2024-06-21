import { PermissionType } from '@/common/permissions/permission-type';

export class QuestionPermission {
  static readonly CREATE_QUESTION: PermissionType = {
    name: 'createَAdminQuestion',
    title: 'ایجاد سوال',
  };

  static readonly UPDATE_QUESTION: PermissionType = {
    name: 'updateQuestion',
    title: 'آپدیت سوال',
  };

  static readonly DELETE_QUESTION: PermissionType = {
    name: 'deleteQuestion',
    title: 'حذف سوال',
  };

  static readonly BULK_DELETE_QUESTION: PermissionType = {
    name: 'bulkDeleteQuestion',
    title: 'حذف چندتایی سوال',
  };
}
