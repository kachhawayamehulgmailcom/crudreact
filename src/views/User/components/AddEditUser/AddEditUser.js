import React, { Component, Fragment } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { SnackBar } from '../../../../components';
import { validateContact, validateEmail } from '../../../../core/validator/Validator';

const useStyles = theme => ({
    form: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    chip: {
        margin: 2
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
        width: '100%'
    },
    title: {
        marginTop: theme.spacing(3),
        textAlign: 'center',
        marginBottom: 20
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    signInButton: {
        margin: theme.spacing(2, 0)
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};
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
class AddEditUser extends Component {
    constructor(props) {
        super(props);
        this.selectCountryDDRef = React.createRef();
        this.state = {
            email: '',
            isEmail: true,
            isPhoneNumberValid: true,
            selectRoleLabelWidth: 0,
            values: {
                fName: '',
                lName: '',
                fatherName: '',
                email: '',
                address: '',
                gender: '',
                mobile: '',
                isUpdateButton: false,
                gender: '',
                dob: new Date(),
                studentId: '',
                countryId: '1',
                images: []
            },
            touched: {
                // email: false,
                password: false,
                // phoneCountryCode: false,
                mobile: false
            },
            errors: {
                email: false,
                // password: false,
                fName: false,
                lName: false,
                // phoneCountryCode: false,
                mobile: false
            },
            loading: false
        };
    }

    componentDidMount = () => {
        var { data } = this.props;
        this.setState({
            selectRoleLabelWidth: this.selectCountryDDRef.current.offsetWidth,
        });
        debugger
        this.userUpdateInfo(data);
    };
    userUpdateInfo = data => {
        this.setState({
            values: data // If user come to edit user info. then his default info show in the field.
                ? {
                    fName: data.fName ? data.fName : '',
                    lName: data.lName ? data.lName : '',
                    fatherName: data.fatherName ? data.fatherName : '',
                    email: data.email ? data.email : '',
                    address: data.address ? data.address : '',
                    mobile: data.mobile ? data.mobile : '',
                    gender: data.gender ? data.gender : '',
                    dob: data.dob ? data.dob : '',
                    studentId: data.studentId,
                    countryId: data.countryId ? data.countryId : '',
                    images: []
                }
                : {
                    // Else user come to  create user.
                    fName: '',
                    lName: '',
                    fatherName: '',
                    email: '',
                    address: '',
                    mobile: '',
                    gender: 'Male',
                    dob: '1995-08-22',
                    // studentId: data.studentId,
                    countryId: '1',
                    images: []
                }
        });
    };
    updateUser = () => {
        let data = this.state.values;
        console.log(data);
        debugger
        let payload = {
            fName: data.fName ? data.fName : '',
            lName: data.lName ? data.lName : '',
            fatherName: data.fatherName ? data.fatherName : '',
            email: data.email ? data.email : '',
            address: data.address ? data.address : '',
            mobile: data.mobile ? data.mobile : '',
            gender: data.gender ? data.gender : '',
            dob: data.dob ? data.dob : '',
            studentId: data.studentId,
            countryId: data.countryId ? data.countryId : '',
            images:data.images.length ? data.images : [],
        };
        this.props.updateSuccess('Update SuccessFully Done',payload);
    };

    handleChange = event => {
        if (event.target.type === 'email') {
            let isValid = validateEmail(event.target.value);
            this.setState({ isEmail: isValid });
        }
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name]: event.target.value
            },
            touched: {
                ...this.state.touched,
                [event.target.name]: true
            },
            errors: {
                ...this.state.errors,
                [event.target.name]: event.target.value ? false : true
            }
        });
    };

    // ***** Mark Country Code Touch (If User Opens DropDown And Not Slecting A Value)
    handlePhoneCountryCodeClick = event => {
        this.setState({ hasError: false });
        if (!this.state.values.phoneCountryCode) {
            this.setState({
                touched: {
                    ...this.state.touched,
                    phoneCountryCode: true
                },
                errors: {
                    ...this.state.errors,
                    phoneCountryCode: true
                }
            });
        }
    };

    handlePhoneCountryCodeChange = event => {
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name]: event.target.value
            },
            touched: {
                ...this.state.touched,
                [event.target.name]: true
            },
            errors: {
                ...this.state.errors,
                [event.target.name]: event.target.value ? false : true
            }
        });
    };
    handleChangeOnmobile = event => {
        let isValid = validateContact(event.target.value);
        this.setState({ isPhoneNumberValid: isValid });
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name]: event.target.value
            },
            touched: {
                ...this.state.touched,
                [event.target.name]: true
            },
            errors: {
                ...this.state.errors,
                [event.target.name]: event.target.value ? false : true
            }
        });
    };
    createUser = event => {
        event.preventDefault();
        let data = this.state.values;
        console.log(data);
        debugger
        let payload = {
            fName: data.fName ? data.fName : '',
            lName: data.lName ? data.lName : '',
            fatherName: data.fatherName ? data.fatherName : '',
            email: data.email ? data.email : '',
            address: data.address ? data.address : '',
            mobile: data.mobile ? data.mobile : '',
            gender: data.gender ? data.gender : '',
            dob: data.dob ? data.dob : '',
            studentId: this.props.studentList.length+1,
            countryId: data.countryId ? data.countryId : '',
            images:data.images.length ? data.images : [],
        };
        this.setState({ alert: true, variant: 'success', message:'User Created SuccessFully Done' });
        this.props.createUserSucess('User Created SuccessFully Done',payload);
        // let selectedId = [];
        // this.state.values.selectedCompanyList.map(data => {
        //   selectedId.push(data.companyId);
        // });
        // let payload = {
        //   email: this.state.values.email,
        //   phoneNumber:
        //     this.state.values.phoneCountryCode.dial_code +
        //     this.state.values.mobile,
        //   fName: this.state.values.fName,
        //   lName: this.state.values.lName,
        //   companyAllocatedTo: selectedId,
        //   type: 4,
        //   gender: this.state.values.gender
        // };
        // console.log(payload);
        // post(url.addUser, payload)
        //   .then(res => {
        //     debugger;
        //   })
        //   .catch(err => {
        //     debugger;
        //   });
    };

    handleChangeMultiple = event => {
        const { value, name } = event.target;
        this.setState({
            values: { ...this.state.values, [name]: value }
        });
    };
    alertClose = () => {
        // Sneack Bar close
        this.setState({ alert: false, variant: '', message: '' });
    };
    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                let _images = this.state.values.images;
                _images.push(e.target.result);
                this.setState({ image: _images });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    onImageRemove = (index) => {
        let _images = this.state.values.images;
        // let _index = getIndexOfArrayData(
        //     _companyTable.companyList,
        //     '_id',
        //     data.trainerId
        //   );
        _images.splice(index, 1);
        this.setState({ image: _images });

    }
    // returnCountryName = (countryId) =>{
    //     return this.countries[0].name;
    // }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <form
                    className={classes.form}
                    onSubmit={this.createUser}
                    autoComplete="off">
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item md={12} xs={12}>
                            <Grid container spacing={3}>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        className={classes.textField}
                                        error={this.state.errors['fName']}
                                        helperText={
                                            this.state.errors['fName']
                                                ? 'First name is required '
                                                : null
                                        }
                                        fullWidth
                                        label="First Name"
                                        name="fName"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.values.fName || ''}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        className={classes.textField}
                                        error={this.state.errors['lName']}
                                        fullWidth
                                        helperText={
                                            this.state.errors['lName']
                                                ? 'last name is required'
                                                : null
                                        }
                                        label="Last Name"
                                        name="lName"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.values.lName || ''}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        className={classes.textField}
                                        error={this.state.errors['email'] || !this.state.isEmail}
                                        fullWidth
                                        helperText={
                                            this.state.errors['email']
                                                ? 'Email is required'
                                                : this.state.isEmail
                                                    ? null
                                                    : 'Invalid Email'
                                        }
                                        label="Email"
                                        name="email"
                                        onChange={this.handleChange}
                                        type="email"
                                        value={this.state.values.email || ''}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        className={classes.textField}
                                        error={this.state.errors['fatherName']}
                                        fullWidth
                                        helperText={
                                            this.state.errors['fatherName']
                                                ? 'last name is required'
                                                : null
                                        }
                                        label="Father Name"
                                        name="fatherName"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.values.fatherName || ''}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>

                                    <TextField
                                        multiline={true}
                                        rows={4}
                                        className={classes.textField}
                                        error={this.state.errors['address']}
                                        fullWidth
                                        helperText={
                                            this.state.errors['address']
                                                ? 'last name is required'
                                                : null
                                        }
                                        label="Address"
                                        name="address"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.values.address || ''}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup label="Gender" aria-label="gender" name="gender" value={this.state.values.gender || ''} onChange={this.handleChange}>
                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                    </RadioGroup>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        id="dob"
                                        className={classes.textField}
                                        fullWidth
                                        label="DOB"
                                        name="dob"
                                        type="date"
                                        onChange={this.handleChange}
                                        // defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={this.state.values.dob || ''}
                                        variant="outlined"
                                    />
                                    {/* <TextField
                                        className={classes.textField}
                                        error={this.state.errors['address']}
                                        fullWidth
                                        helperText={
                                            this.state.errors['address']
                                                ? 'last name is required'
                                                : null
                                        }
                                        label="Address"
                                        name="address"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.values.address || ''}
                                        variant="outlined"
                                        required
                                    /> */}
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <FormControl
                                        required
                                        variant="outlined"
                                        className={classes.formControl}>
                                        <InputLabel
                                            ref={this.selectCountryDDRef}
                                            htmlFor="outlined-role-simple">
                                            Country
                                        </InputLabel>
                                        <Select
                                            value={this.state.values['countryId']}
                                            onChange={this.handleChange}
                                            labelWidth={this.state.selectRoleLabelWidth}
                                            inputProps={{
                                                name: 'countryId',
                                                id: 'outlined-role-simple'
                                            }}>
                                            {
                                                countries.map((c, index) => (
                                                    <MenuItem key={index} value={c.countryId}>{c.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        required
                                        className={classes.textField}
                                        error={
                                            this.state.errors['mobile'] ||
                                            !this.state.isPhoneNumberValid
                                        }
                                        type="number"
                                        onChange={this.handleChangeOnmobile}
                                        fullWidth
                                        value={this.state.values.mobile}
                                        helperText={
                                            this.state.errors['mobile']
                                                ? 'Phone number is required'
                                                : this.state.isPhoneNumberValid
                                                    ? null
                                                    : 'Invalid Phone No.'
                                        }
                                        label="Phone Number"
                                        name="mobile"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    {/* <Grid item md={12} xs={12}> */}
                                    {/* <Avatar className={classes.orangeAvatar}>N</Avatar> */}
                                    {this.state.values.images && this.state.values.images.length ?
                                        // <div
                                        //     style={{
                                        //         marginLeft: 'auto',
                                        //         marginRight: 'auto',
                                        //         background: 'gray',
                                        //         borderRadius: '5px'
                                        //     }}
                                        // className={classes.marginTop}>
                                        this.state.values.images.map((img, index) => (
                                            <Grid item md={3} xs={3} key={index}>
                                                <img
                                                    alt="displayCompanyLogo"
                                                    src={img}
                                                    style={{
                                                        height: '90px',
                                                        width: '90px',
                                                        borderRadius: '5px',
                                                    }}
                                                />
                                                <Button
                                                    className={classes.uploadButton}
                                                    color="primary"
                                                    component="span"
                                                    variant="text"
                                                    onClick={(index) => this.onImageRemove(index)}
                                                >
                                                    Remove This Pic
                                                </Button>
                                            </Grid>
                                        ))
                                        // </div>
                                        :
                                        <div
                                            style={{
                                                height: '90px',
                                                width: '90px',
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                background: 'gray',
                                                borderRadius: '5px'
                                            }}
                                            className={classes.marginTop}>
                                        </div>
                                    }
                                    {/* </Grid> */}
                                    {/* <Grid item md={12} xs={12}> */}
                                    <div style={{ textAlign: 'center', marginTop: '2px' }}>
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="text-button-file"
                                            type="file"
                                            onChange={this.onImageChange}
                                        />
                                        <label htmlFor="text-button-file">
                                            <Button
                                                className={classes.uploadButton}
                                                color="primary"
                                                component="span"
                                                variant="text">
                                                Upload new picture
                                            </Button>
                                        </label>
                                    </div>
                                    {/* </Grid> */}
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <Button
                                        className={classes.signInButton}
                                        color="primary"
                                        onClick={ this.props.isEditUser ? this.updateUser : this.create}
                                        disabled={
                                            this.state.values['email'] &&
                                                this.state.isEmail &&
                                                this.state.values['fName'] &&
                                                this.state.values['lName'] &&
                                                this.state.values['fatherName'] &&
                                                this.state.values['mobile'] &&
                                                this.state.isPhoneNumberValid
                                                ? false
                                                : true
                                        }
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained">
                                        {this.props && this.props.isEditUser ? 'Update info' : 'Create'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
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
export default withStyles(useStyles)(AddEditUser);
