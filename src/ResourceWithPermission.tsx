import React from 'react';
import { Resource, ResourceProps } from 'ra-core';
import { useACL } from './useACL';

interface Props extends ResourceProps {
  options?: {
    label?: string;
    resource?: string;
  };
}

export function ResourceWithPermission(props: Props) {
  const { name, list, create, edit, show, options } = props;

  console.log('with perm', name, list);

  const resource = options?.resource;
  const resourceToAccess = resource ?? name;
  const access = useACL(resourceToAccess);

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
