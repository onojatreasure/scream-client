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
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.pages
});

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
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
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
    };
    handleChange = (event) => {
        this.setState({
        [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes, UI: {loading} } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="monkey" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
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
                        > Login 
                            {loading && (
                                <CircularProgress 
                                    className={classes.progress} 
                                    color="primary" />
                            )}
                        </Button>
                        <br />
                        <small>
                            <p>Do you wanna scream but don't have a account yet?</p>
                            <p><Link to="/signup" color="inherit">Sign up</Link></p>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
