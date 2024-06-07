import { PermissionPermit } from '@/modules/auth/components/permission/permission/permission-permit';
import { RolePermission } from '@/modules/auth/components/role/permission/role-permission';
import { BookmarkPermission } from '@/modules/bookmark/permission/bookmark-permission';
import { BusinessPermission } from '@/modules/business/permission/business-permission';
import { CommentPermission } from '@/modules/comment/permission/business-permission';
import { FavoritePermission } from '@/modules/favorite/permission/favorite-permission';
import { ImagePermission } from '@/modules/image/permission/image-permission';
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

  static readonly CREATE_ADMIN_COMMENT = CommentPermission.CREATE_ADMIN_COMMENT;
  static readonly UPDATE_COMMENT = CommentPermission.UPDATE_COMMENT;
  static readonly DELETE_COMMENT = CommentPermission.DELETE_COMMENT;
  static readonly BULK_DELETE_COMMENT = CommentPermission.BULK_DELETE_COMMENT;

  static readonly BULK_DELETE_FAVORITE =
    FavoritePermission.BULK_DELETE_FAVORITE;

  static readonly BULK_DELETE_BOOKMARK =
    BookmarkPermission.BULK_DELETE_BOOKMARK;

  static readonly CREATE_SELLER = UserPermission.CREATE_SELLER;
  static readonly UPDATE_SELLER = UserPermission.UPDATE_SELLER;
  static readonly DELETE_SELLER = UserPermission.DELETE_SELLER;
  static readonly BULK_DELETE_SELLER = UserPermission.BULK_DELETE_SELLER;
}
