import { PermissionPermit } from '@/modules/auth/components/permission/permission/permission-permit';
import { RolePermission } from '@/modules/auth/components/role/permission/role-permission';
import { BookmarkPermission } from '@/modules/bookmark/permission/bookmark-permission';
import { BusinessPermission } from '@/modules/business/permission/business-permission';
import { FavoritePermission } from '@/modules/favorite/permission/favorite-permission';
import { ImagePermission } from '@/modules/image/permission/image-permission';
import { ReviewPermission } from '@/modules/review/permission/review-permission';
import { TaxonomyPermission } from '@/modules/taxonomy/permission/taxonomy-permission';
import { UserPermission } from '@/modules/user/permission/user-permission';

export class PermissionType {
  name: string;
  title: string;
}

export class Permission {
  static readonly CREATE: PermissionType = { name: 'create', title: 'ایجاد' };
  static readonly UPDATE: PermissionType = { name: 'update', title: 'آپدیت' };
  static readonly DELETE: PermissionType = { name: 'delete', title: 'حذف' };
  static readonly READ: PermissionType = { name: 'read', title: 'خواندن' };
  static readonly BULK_DELETE: PermissionType = {
    name: 'bulkDelete',
    title: 'حذف چندتایی',
  };

  static readonly REGULAR_USER: PermissionType = {
    name: 'regularUser',
    title: 'کاربر ساده',
  };

  static readonly CREATE_USER = UserPermission.CREATE_USER;
  static readonly UPDATE_USER = UserPermission.UPDATE_USER;
  static readonly DELETE_USER = UserPermission.DELETE_USER;

  static readonly CREATE_PERMISSION = PermissionPermit.CREATE_PERMISSION;
  static readonly UPDATE_PERMISSION = PermissionPermit.UPDATE_PERMISSION;
  static readonly DELETE_PERMISSION = PermissionPermit.DELETE_PERMISSION;
  static readonly BULK_DELETE_PERMISSION =
    PermissionPermit.BULK_DELETE_PERMISSION;

  static readonly CREATE_ROLE = RolePermission.CREATE_ROLE;
  static readonly UPDATE_ROLE = RolePermission.UPDATE_ROLE;
  static readonly DELETE_ROLE = RolePermission.DELETE_ROLE;
  static readonly BULK_DELETE_ROLE = RolePermission.BULK_DELETE_ROLE;

  static readonly UPLOAD_IMAGE = ImagePermission.UPLOAD_IMAGE;
  static readonly UPDATE_IMAGE = ImagePermission.UPDATE_IMAGE;
  static readonly DELETE_IMAGE = ImagePermission.DELETE_IMAGE;

  static readonly CREATE_TAXONOMY = TaxonomyPermission.CREATE_TAXONOMY;
  static readonly UPDATE_TAXONOMY = TaxonomyPermission.UPDATE_TAXONOMY;
  static readonly DELETE_TAXONOMY = TaxonomyPermission.DELETE_TAXONOMY;

  static readonly CREATE_BUSINESS = BusinessPermission.CREATE_BUSINESS;
  static readonly UPDATE_BUSINESS = BusinessPermission.UPDATE_BUSINESS;
  static readonly DELETE_BUSINESS = BusinessPermission.DELETE_BUSINESS;
  static readonly BULK_DELETE_BUSINESS =
    BusinessPermission.BULK_DELETE_BUSINESS;

  static readonly CREATE_ADMIN_REVIEW = ReviewPermission.CREATE_ADMIN_REVIEW;
  static readonly UPDATE_REVIEW = ReviewPermission.UPDATE_REVIEW;
  static readonly DELETE_REVIEW = ReviewPermission.DELETE_REVIEW;
  static readonly BULK_DELETE_REVIEW = ReviewPermission.BULK_DELETE_REVIEW;

  static readonly CREATE_FAVORITE = FavoritePermission.CREATE_FAVORITE;
  static readonly UPDATE_FAVORITE = FavoritePermission.UPDATE_FAVORITE;
  static readonly DELETE_FAVORITE = FavoritePermission.DELETE_FAVORITE;
  static readonly BULK_DELETE_FAVORITE =
    FavoritePermission.BULK_DELETE_FAVORITE;

  static readonly CREATE_BOOKMARK = BookmarkPermission.CREATE_BOOKMARK;
  static readonly UPDATE_BOOKMARK = BookmarkPermission.UPDATE_BOOKMARK;
  static readonly DELETE_BOOKMARK = BookmarkPermission.DELETE_BOOKMARK;
  static readonly BULK_DELETE_BOOKMARK =
    BookmarkPermission.BULK_DELETE_BOOKMARK;
}
