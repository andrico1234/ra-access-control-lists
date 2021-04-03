import * as React from 'react';
import { Children, cloneElement } from 'react';
import BookIcon from '@material-ui/icons/Book';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  BooleanField,
  ChipField,
  Datagrid,
  DateField,
  EditButton,
  Filter,
  InputProps,
  List,
  NumberField,
  ReferenceArrayField,
  SearchInput,
  ShowButton,
  SingleFieldList,
  TextField,
  TextInput,
  useTranslate,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import { FieldWithPermission } from '../../../src/FieldWithPermission';

export const PostIcon = BookIcon;

const useQuickFilterStyles = makeStyles(theme => ({
  chip: {
    marginBottom: theme.spacing(1),
  },
}));
const QuickFilter = ({ label }: InputProps) => {
  const translate = useTranslate();
  const classes = useQuickFilterStyles();
  return <Chip className={classes.chip} label={translate(label)} />;
};

const PostFilter = props => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <TextInput source="title" defaultValue="Qui tempore rerum et voluptates" />
    <QuickFilter
      label="resources.posts.fields.commentable"
      source="commentable"
      defaultValue
    />
  </Filter>
);

const useStyles = makeStyles(theme => ({
  title: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  hiddenOnSmallScreens: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  publishedAt: { fontStyle: 'italic' },
}));

const usePostListActionToolbarStyles = makeStyles({
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    marginTop: -1,
    marginBottom: -1,
  },
});

const PostListActionToolbar = ({ children, ...props }) => {
  const classes = usePostListActionToolbarStyles();
  return (
    <div className={classes.toolbar}>
      {Children.map(children, button => cloneElement(button, props))}
    </div>
  );
};

const PostPanel = ({ id, record, resource }) => (
  <div dangerouslySetInnerHTML={{ __html: record.body }} />
);

const PostList = props => {
  const classes = useStyles();

  return (
    <List
      {...props}
      filters={<PostFilter />}
      sort={{ field: 'published_at', order: 'DESC' }}
    >
      <Datagrid rowClick="show" expand={PostPanel} optimized>
        <TextField source="id" />
        <TextField source="title" cellClassName={classes.title} />
        <DateField
          source="published_at"
          sortByOrder="DESC"
          cellClassName={classes.publishedAt}
        />

        <BooleanField
          source="commentable"
          label="resources.posts.fields.commentable_short"
          sortable={false}
        />
        <NumberField source="views" sortByOrder="DESC" />
        <ReferenceArrayField
          label="Tags"
          reference="tags"
          source="tags"
          sortBy="tags.name"
          sort={tagSort}
          cellClassName={classes.hiddenOnSmallScreens}
          headerClassName={classes.hiddenOnSmallScreens}
        >
          <SingleFieldList>
            <ChipField source="name.en" size="small" />
          </SingleFieldList>
        </ReferenceArrayField>
        <PostListActionToolbar>
          <FieldWithPermission
            inputProps={{}}
            Input={EditButton}
            options={{
              resource: 'posts',
              permission: 'edit',
            }}
          />
          <ShowButton />
        </PostListActionToolbar>
      </Datagrid>
    </List>
  );
};

const tagSort = { field: 'name.en', order: 'ASC' };

export default PostList;
