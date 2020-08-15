import React from 'react';
import clsx from 'clsx';
import { Drawer } from '@material-ui/core';
import { FitnessCenter } from '@material-ui/icons';
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 240,
        [theme.breakpoints.up('lg')]: {
            marginTop: 64,
            height: 'calc(100% - 64px)'
        }
    },
    root: {
        backgroundColor: theme.palette.white,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: theme.spacing(2)
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    nav: {
        marginBottom: theme.spacing(2)
    }
}));

const Sidebar = props => {
    const { open, variant, onClose, className, ...rest } = props;
    const classes = useStyles();

    const adminPages = [
        {
            title: 'Student Registration',
            href: '/AddStudent',
            icon: <PeopleIcon />
        },
        {
            title: 'View Student',
            href: '/ViewStudent',
            icon: <FitnessCenter />
        }
    ];
    return (
        <Drawer
            anchor="left"
            classes={{ paper: classes.drawer }}
            onClose={onClose}
            open={open}
            variant={variant}>
            <div {...rest} className={clsx(classes.root, className)}>
                <SidebarNav
                    className={classes.nav}
                    pages={adminPages}
                />
            </div>
        </Drawer>
    );
};

Sidebar.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired
};

export default Sidebar;
