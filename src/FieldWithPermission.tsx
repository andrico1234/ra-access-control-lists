import React from 'react';
import { useACL } from './useACL';
import { FieldProps } from 'ra-ui-materialui';
import { PermissionKey } from './types';

type Props<T> = FieldWithPermissionProps<T> & FieldProps;

type FieldWithPermissionProps<T> = {
  options: {
    resource: string;
    permission: PermissionKey;
  };
  inputProps: T;
  Input: (props: FieldProps & T) => JSX.Element;
};

export function FieldWithPermission<T>(props: Props<T>) {
  const { options, Input, inputProps, ...rest } = props;
  const { resource, permission } = options;

  const access = useACL(resource);
  const canAccess = access[permission];

  if (!canAccess) return null;

  return <Input {...rest} {...inputProps} />;
}
