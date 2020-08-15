import React, { Component, Fragment } from 'react';

import { Card, CardContent, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withRouter } from 'react-router-dom';
import { Dialog, SnackBar } from '../../../../components';
import { dateFormat } from '../../../../components/TimeFormet/TimeFormat';
import { getIndexOfArrayData } from '../../../../core/global/util';
import AddEditUser from '../AddEditUser';
import './UserTable.scss';
const countries = [
    {
        "countryId": "1",
        "sortname": "AF",
        "name": "Afghanistan",
        "text": "Afghanistan",
        "timezone": 29,
        "currency": "2",
        "languageCode": "en",
        "currency_format": "en"
    },
    {
        "countryId": "2",
        "sortname": "AL",
        "name": "Albania",
        "text": "Albania",
        "timezone": 6,
        "currency": "3",
        "languageCode": "el",
        "currency_format": "el"
    },
    {
        "countryId": "3",
        "sortname": "DZ",
        "name": "Algeria",
        "text": "Algeria",
        "timezone": 6,
        "currency": "32",
        "languageCode": "en",
        "currency_format": "en"
    },
    {
        "countryId": "4",
        "sortname": "AS",
        "name": "American Samoa",
        "text": "American Samoa",
        "timezone": 95,
        "currency": "1",
        "languageCode": "en",
        "currency_format": "en"
    }];
const useStyles = theme => ({
    root: {},
    content: {
        padding: 0
    },
    inner: {
        minWidth: 1050
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    actions: {
        justifyContent: 'flex-end'
    },
    button: {
        margin: 0,
        padding: theme.spacing(1)
    },
    actionButton: {
        display: 'flex'
    }
});
class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newRow: false,
            forShow: [],
            isDialogOpen: false,
            dialogHeader: '',
            dialogName: '',
            isComponent: '',
            data: {},
            name: '',
            companyList: [],
            isData: '',
            direction: true,
            alert: false,
            variant: '',
            message: '',
            activeSortName: 'firstName'
        };
    }
    alertClose = () => {
        this.setState({
            alert: false,
            variant: '',
            messsage: ''
        });
    };
    openDialog = (data, text, isData) => {
        var filterData = [];
        if (isData === 'companies') {
            data.images.map(company => {
                return filterData.push(company);
            });
        }
        if (isData === 'trainings') {
            data.typesOfTrainingsHeParticipated.map(training => {
                return filterData.push(training.category);
            });
        }
        this.setState({
            dialogHeader: text,
            isDialogOpen: true,
            isData: isData,
            data: isData === 'editUser' ? data : [],
            forShow: isData !== 'editUser' ? filterData : []
        });
    };
    handleCloseAddUserDialog = () => {
        this.setState({
            isDialogOpen: false,
        });
    };
    updateSuccess = (message, userUpdatedData) => {
        this.setState({ alert: true, variant: 'success', message });
        this.props.userUpdateSuccess(userUpdatedData);
        this.handleCloseAddUserDialog();
    };
    returnCountry = (countryId) => {
        let _index = getIndexOfArrayData(countries, 'countryId', countryId);
        if (-1 != _index) {
            return countries[_index]['name'];
        }
    }

    dialogBody = () => {
        return this.state.isData === 'editUser' ? (
            <Fragment>
                <AddEditUser
                    updateSuccess={(message, userUpdatedData) => this.updateSuccess(message, userUpdatedData)}
                    data={this.state.data}
                    isEditUser={true}
                />
            </Fragment>
        ) : (
                <div>
                    <Grid item md={12} xs={12}>
                        {this.state.forShow.map((c, i) => (
                            <Grid key={i + 1} item md={4} xs={4} container justify="center">
                                <img style={{ width: '100%' }} src={c} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            );
    };

    render() {
        const { users, classes, count, page, pagination } = this.props;
        return (
            <Fragment>
                <Card className={classes.root}>
                    <CardContent className={classes.content}>
                        <PerfectScrollbar>
                            <div className={classes.inner}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="tableCell ">
                                                Student Image(s)
                                            </TableCell>
                                            <TableCell className="tableCell ">
                                                Student Name
                                            </TableCell>
                                            <TableCell className="tableCell ">
                                                Father Name
                                            </TableCell>
                                            <TableCell>
                                                Email
                                            </TableCell>
                                            <TableCell>
                                                Address
                                            </TableCell>
                                            <TableCell>
                                                Mobile
                                            </TableCell>
                                            <TableCell>
                                                Gender
                                            </TableCell>
                                            <TableCell>
                                                DOB
                                            </TableCell>
                                            <TableCell>
                                                Country
                                            </TableCell>
                                            <TableCell className="fixedColumn-right fixedColumnBackgroundTh">
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.length !== 0 &&
                                            users.map((user, index) => (
                                                <TableRow key={index} className={classes.tableRow}>
                                                    {user.images &&
                                                        user.images.length ? (
                                                            <TableCell
                                                                className="tableCell cursorpointer getHoverEffectContainer"
                                                                onClick={() =>
                                                                    this.openDialog(
                                                                        user,
                                                                        user.fName +
                                                                        ' ' +
                                                                        user.lName +
                                                                        ' Image(s)',
                                                                        'companies'
                                                                    )
                                                                }>
                                                                <div>
                                                                    <span>
                                                                        Click To See Image(s)
                                                                    </span>
                                                                </div>
                                                            </TableCell>
                                                        ) : (
                                                            <TableCell className="tableCell ">
                                                                No Images
                                                            </TableCell>
                                                        )}
                                                    <TableCell className="tableCell">
                                                        <div className={classes.nameContainer}>
                                                            {user.fName + ' ' + user.lName}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="tableCell">
                                                        <div className={classes.nameContainer}>
                                                            {user.fatherName}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>{user.address}</TableCell>
                                                    <TableCell className="tableCell">
                                                        {user.mobile}
                                                    </TableCell>
                                                    <TableCell>{user.gender}</TableCell>
                                                    <TableCell>{dateFormat(user.dob)}</TableCell>
                                                    <TableCell>{this.returnCountry(user.countryId)}</TableCell>

                                                    <TableCell className="fixedColumn-right fixedColumnBackgroundTd">
                                                        <IconButton
                                                            onClick={() =>
                                                                this.openDialog(user, 'Edit User', 'editUser')
                                                            }
                                                            className={classes.button}>
                                                            <Edit style={{ color: 'green' }} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </PerfectScrollbar>
                    </CardContent>
                </Card>
                <Dialog
                    open={this.state.isDialogOpen}
                    handleClose={() => {
                        this.handleCloseAddUserDialog();
                    }}
                    maxWidth={this.state.dialogHeader === 'Edit User' ? 'md' : 'md'}
                    dialogHeaderText={this.state.dialogHeader}
                    dialogBody={this.dialogBody()}
                    dialogFooter={null}
                />
                <SnackBar
                    open={this.state.alert}
                    variant={this.state.variant}
                    message={this.state.message}
                    alertClose={this.alertClose}
                />
            </Fragment>
        );
    }
}
UsersTable.propTypes = {
    history: PropTypes.object
};
export default withRouter(withStyles(useStyles)(UsersTable));
