import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { DialogContent } from '@material-ui/core';

// const DialogContent = withStyles(theme => ({
//     root: {
//         padding: theme.spacing(2),
//     },
// }))(MuiDialogContent);
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
export const DialogBody = withStyles(styles)(props => {
  const { children } = props;
  return <DialogContent dividers>{children}</DialogContent>;
});
