import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import {setUser} from 'actions/user';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 400,
    backgroundColor: theme.palette.background.paper,
  },
}));

function renderRow(props) {
  const { index, style, data } = props;
  const { list, dispatch, onClick } = data;
  const { login } = list[index] || {};

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={login} onMouseUp={() => {
        dispatch(setUser(login));
        onClick();
      }}/>
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default function VirtualizedList({itemCount, list, onClick}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={46}
            itemCount={itemCount}
            itemData={{list, dispatch, onClick}}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
}