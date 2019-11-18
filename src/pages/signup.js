import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
//import axios from 'axios';
import { Link } from 'react-router-dom';

//MUI STUFF
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.pages
});

class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    static getDerivedStateFromProps(props) {
        if (props.UI.errors) {
          return {
            errors: props.UI.errors
          }
        }
        // Return null if the state hasn't changed
        return null;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
        [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="monkey" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                    <TextField 
                            id="handle" name="handle" type="text" 
                            label="Handle"
                            className={classes.textField}
                            helperText={errors.handle}
                            error={errors.handle ? true : false }
                            value={this.state.handle}
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        <TextField id="email" name="email" 
                            type="email" label="joe@email.com"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false }
                            value={this.state.email}
                            onChange={this.handleChange} fullWidth
                        />
                        <TextField 
                            id="password" name="password" type="password" 
                            label="Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false }
                            value={this.state.password}
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        <TextField 
                            id="confirmPassword" name="confirmPassword" type="password" 
                            label="confirmPassword"
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false }
                            value={this.state.confirmPassword}
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" 
                            variant='contained' 
                            color="primary" 
                            className={classes.button}
                            disabled={loading}
                        > Signup 
                            {loading && (
                                <CircularProgress 
                                    className={classes.progress} 
                                    color="primary" />
                            )}
                        </Button>
                        <br />
                        <small>
                            <p>Do you already have an account?</p>
                            <p> C'mon now, <Link to="/login" color="inherit">Login</Link></p>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));