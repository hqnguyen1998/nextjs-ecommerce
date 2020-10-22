import { Chip } from '@material-ui/core';

const TagsList = ({ tags }) => {
  return tags.map((tag, i) => (
    <Chip
      color='primary'
      label={tag}
      style={{ marginLeft: 5, marginTop: 10 }}
    />
  ));
};

export default TagsList;
