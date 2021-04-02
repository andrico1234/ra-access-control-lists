export interface Permission {
  list?: boolean;
  create?: boolean;
  edit?: boolean;
  show?: boolean;
  enabled?: boolean;
}

export type PermissionKey = keyof Permission;
