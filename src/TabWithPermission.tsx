import React from 'react';
import { TabProps, Tab } from 'react-admin';
import { useACL } from './useACL';
import { PermissionKey } from './types';

interface TabWithPermissionProps {
  options: {
    resource: string;
    permission: PermissionKey;
  };
}

type Props = TabWithPermissionProps & TabProps;

export function TabWithPermission(props: Props) {
  const { options } = props;
  const { resource, permission } = options;

  const access = useACL(resource);
  const canAccess = access[permission];

  if (!canAccess) return null;

  return <Tab {...props} />;
}
