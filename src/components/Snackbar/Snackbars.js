import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Button,
  Snackbar,
  SnackbarContent,
  Slide
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { green, amber } from '@material-ui/core/colors';

function TransitionRight(props) {
  return <Slide {...props} direction="left" />;
}

const useStyles = theme => ({
  close: {
    padding: theme.spacing(0.5)
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  message: {},
  icon: {}
});

class SnackBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, open, variant, message, confirm } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        TransitionComponent={TransitionRight}
        // autoHideDuration={10000}
        onClose={() => this.props.alertClose()}>
        <SnackbarContent
          className={classes[variant]}
          aria-describedby="client-snackbar"
          message={
            // <span id="client-snackbar" className={classes.message}>
            message
            // </span>
          }
          action={[
            confirm && (
              <Button
                onClick={() => this.props.onDelete()}
                key="delete"
                color="secondary"
                size="small">
                confirm
              </Button>
            ),
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => this.props.alertClose()}>
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    );
  }
}

export default withStyles(useStyles)(SnackBar);
