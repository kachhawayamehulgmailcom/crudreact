import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import './Topbar.scss';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, children, ...rest } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // console.log(children);

  return (
    <React.Fragment>
      <AppBar
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Toolbar>

          <div className={classes.flexGrow} />
          
         
        </Toolbar>
      </AppBar>
      
    </React.Fragment>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
