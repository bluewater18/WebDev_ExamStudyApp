import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeRegisterName, changeRegisterEmail, changeRegisterPassword, registerComplete, changeRegisterStepper } from '../actions/action-register-form-change';

const styles = theme => ({
    root: {
        width: '40%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});



class Register extends React.Component {

    handleNext = () => {
        if (this.props.ui.registerStepperState === this.getSteps().length-1) {
            this.props.registerComplete(this.props.register);
        } else {
            this.props.changeRegisterStepper(this.props.ui.registerStepperState + 1);
        }
    };

    handleBack = () => {
        this.props.changeRegisterStepper(this.props.ui.registerStepperState - 1);
    };

    handleReset = () => {
        this.props.changeRegisterStepper(0);
    };

    getSteps() {
        return ['Required Fields', 'Image (WIP)', 'Submit'];
    }
    getStepContent(step) {
        switch (step) {
            case 0:
                return this.renderStep1();
            case 1:
                return this.renderStep2();
            case 2:
                return this.renderStep3()
            default:
                return 'Unknown step';
        }
    }

    renderStep1() {
        const { classes } = this.props;
        return(
            
            <div id="register-form" className={classes.container}>
                <TextField
                    required
                    value={this.props.register.UserName}
                    onChange={evt => this.props.changeRegisterName(evt.target.value)}
                    id="register-name"
                    label="Name"
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    required
                    value={this.props.register.UserEmail}
                    onChange={evt => this.props.changeRegisterEmail(evt.target.value)}
                    id="register-email"
                    label="Email"
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    required
                    value={this.props.register.UserPassword}
                    onChange={evt => this.props.changeRegisterPassword(evt.target.value)}
                    id="register-password"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    margin="normal"
                />
            </div>
        )
    }

    renderStep2() {
        return (<h4> Image selector to go here </h4>);
    }

    renderStep3() {
        return (null);
    }

    renderFinalStep() {
        return (<h2> Done! </h2>);
    }

    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.props.ui.registerStepperState;
        return (
            <div className="Register">
                <Background />
                <div className={classes.root}>
                    <Stepper activeStep={this.props.ui.registerStepperState} orientation="vertical">
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        {this.getStepContent(index)}
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={this.props.ui.registerStepperState === 0}
                                                    onClick={this.handleBack}
                                                    className={classes.button}
                                                >
                                                    Back
                      </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleNext}
                                                    className={classes.button}
                                                >
                                                    {this.props.ui.registerStepperState === steps.length - 1 ? 'Submit' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {this.props.ui.registerStepperState === steps.length ? this.renderFinalStep() : null}
                </div>

            </div>
        )
    }
}

Register.propTypes = {
    classes: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        ui: state.ui,
        register: state.register,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeRegisterStepper: changeRegisterStepper,
        changeRegisterName: changeRegisterName,
        changeRegisterEmail: changeRegisterEmail,
        changeRegisterPassword: changeRegisterPassword,
        registerComplete: registerComplete,
    }, dispatch);
}

const styled = withStyles(styles)(Register)

export default connect(mapStateToProps, mapDispatchToProps)(styled);