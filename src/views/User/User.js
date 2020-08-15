import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getIndexOfArrayData } from '../../core/global/util';
import ErrorBoundary from '../../core/handel-error/ErrorBoundary';
import './User.scss';
import { UsersTable } from './components';

const useStyles = theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
});
// ***** User Crud Main Layout
class UserLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
        };
    }
    componentDidMount = () => {
        this.setState({
            userList: this.props.studentList,
            count: this.props.studentList.length
        });
    };
    updateSuccess = (userUpdatedData) => {
        let _userList = this.state.userList;
        let _index = getIndexOfArrayData(_userList, 'studentId', userUpdatedData.studentId);
        if (_index != -1) {
            _userList[_index] = userUpdatedData;
        }
        this.setState({ userList: _userList })
    };
    render() {
        const { classes } = this.props;
        return (
            <ErrorBoundary>
                <div className={classes.root}>
                    <div className={classes.content}>
                        <UsersTable
                            userUpdateSuccess={(userUpdatedData) => this.updateSuccess(userUpdatedData)}
                            users={this.state.userList}
                            count={this.state.count}
                        />
                    </div>
                </div>
            </ErrorBoundary>
        );
    }
}
UserLayout.propTypes = {
    history: PropTypes.object
};
export default withRouter(withStyles(useStyles)(UserLayout));
