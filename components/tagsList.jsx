import { Chip } from '@material-ui/core';

const TagsList = ({ tags }) => {
  return tags.map((tag, i) => (
    <Chip
      key={i}
      color='primary'
      label={tag}
      style={{ marginLeft: 5, marginTop: 10 }}
    />
  ));
};

export default TagsList;
