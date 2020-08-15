import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { DialogActions } from '@material-ui/core';
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});
// const DialogActions = withStyles(theme => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(1),
//     },
// }))(MuiDialogActions);
export const DialogFooter = withStyles(styles)(props => {
  const { children } = props;
  return <DialogActions>{children}</DialogActions>;
});
