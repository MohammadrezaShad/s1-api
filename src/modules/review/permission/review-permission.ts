import { PermissionType } from '@/common/permissions/permission-type';

export class ReviewPermission {
  static readonly CREATE_ADMIN_REVIEW: PermissionType = {
    name: 'createَAdminReview',
    title: 'ایجاد review ادمین',
  };

  static readonly UPDATE_REVIEW: PermissionType = {
    name: 'updateReview',
    title: 'آپدیت review',
  };

  static readonly DELETE_REVIEW: PermissionType = {
    name: 'deleteReview',
    title: 'حذف review',
  };

  static readonly BULK_DELETE_REVIEW: PermissionType = {
    name: 'bulkDeleteReview',
    title: 'حذف چندتایی review',
  };
}
