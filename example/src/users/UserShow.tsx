/* eslint react/jsx-key: off */
import * as React from 'react';
import { Show, Tab, TabbedShowLayout, TextField } from 'react-admin'; // eslint-disable-line import/no-unresolved

const UserShow = ({ permissions, ...props }) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="user.form.summary">
        <TextField source="id" />
        <TextField source="name" />
      </Tab>

      <Tab label="user.form.security" path="security">
        <TextField source="role" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default UserShow;
