import * as React from 'react';
import { useMemo } from 'react';
import {
  BooleanInput,
  Create,
  DateInput,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const PostCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      label="post.action.save_and_edit"
      redirect="edit"
      submitOnEnter={true}
    />
    <SaveButton
      label="post.action.save_and_show"
      redirect="show"
      submitOnEnter={false}
      variant="text"
    />
    <SaveButton
      label="post.action.save_and_add"
      redirect={false}
      submitOnEnter={false}
      variant="text"
    />
    <SaveButton
      label="post.action.save_with_average_note"
      transform={data => ({ ...data, average_note: 10 })}
      redirect="show"
      submitOnEnter={false}
      variant="text"
    />
  </Toolbar>
);

const PostCreate = ({ permissions, ...props }) => {
  const initialValues = useMemo(
    () => ({
      average_note: 0,
    }),
    []
  );

  const dateDefaultValue = useMemo(() => new Date(), []);

  return (
    <Create {...props}>
      <SimpleForm toolbar={<PostCreateToolbar />} initialValues={initialValues}>
        <TextInput autoFocus source="title" />
        <TextInput source="teaser" fullWidth={true} multiline={true} />
        <DateInput source="published_at" defaultValue={dateDefaultValue} />
        <BooleanInput source="commentable" defaultValue />
      </SimpleForm>
    </Create>
  );
};

export default PostCreate;
