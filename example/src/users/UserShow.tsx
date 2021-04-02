/* eslint react/jsx-key: off */
import * as React from 'react';
import { Show, Tab, TabbedShowLayout, TextField } from 'ra-ui-materialui'; // eslint-disable-line import/no-unresolved
// import { TabWithPermission } from '../../.';

const UserShow = ({ permissions, ...props }) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="user.form.summary">
        <TextField source="id" />
        <TextField source="name" />
      </Tab>
      {/* 
      <TabWithPermission label="user.form.security" path="security">
        <TextField source="role" />
      </TabWithPermission> */}
    </TabbedShowLayout>
  </Show>
);

export default UserShow;
