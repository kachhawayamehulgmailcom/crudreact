import React, { Component, Fragment } from 'react';
import { Dialog } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { DialogBody } from './components/DialogContent/DialogContent';
import { DialogFooter } from './components/DialogFooter/DialogFooter';
import { DialogHeader } from './components/DialogHeader/DialogHeader';
const useStyles = theme => ({
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
class CustomDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <Fragment>
        <Dialog
          // onClose={this.props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
          maxWidth={this.props.maxWidth}
          fullWidth>
          <DialogHeader
            id="customized-dialog-title"
            onClose={this.props.handleClose}>
            {this.props.dialogHeaderText}
          </DialogHeader>
          <DialogBody>{this.props.dialogBody}</DialogBody>
          {this.props.dialogFooter && (
            <DialogFooter>{this.props.dialogFooter}</DialogFooter>
          )}
        </Dialog>
      </Fragment>
    );
  }
}

CustomDialog.propTypes = {
  history: PropTypes.object
};

export default withRouter(withStyles(useStyles)(CustomDialog));
