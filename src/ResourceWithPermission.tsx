import React from 'react';
import { Resource, ResourceProps } from 'ra-core';
import { useACL } from './useACL';

export function ResourceWithPermission(props: ResourceProps) {
  const { name, list, create, edit, show } = props;
  const access = useACL(name);

  return (
    <Resource
      {...props}
      name={name}
      list={access.list ? list : undefined}
      create={access.create ? create : undefined}
      edit={access.edit ? edit : undefined}
      show={access.show ? show : undefined}
    />
  );
}
