/* eslint react/jsx-key: off */
import * as React from 'react';
import { Resource } from 'ra-core'; // eslint-disable-line import/no-unresolved
import { Admin } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { render } from 'react-dom';
import { ResourceWithPermission } from '../src/ResourceWithPermission';
import { authProvider } from './src/authProvider';
import dataProvider from './src/dataProvider';
import posts from './src/posts';
import users from './src/users';

render(
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    title="Example Admin"
  >
    <ResourceWithPermission name="posts" {...posts} />
    <ResourceWithPermission name="users" {...users} />
  </Admin>,
  document.getElementById('root')
);
