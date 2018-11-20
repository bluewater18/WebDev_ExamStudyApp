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
        return [<h3>Required Fields</h3>, <h3>Image (WIP) </h3>, <h3>Submit</h3>];
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
            
            <div id="register-form" className="register-container">
                <TextField
                    required
                    value={this.props.register.UserName}
                    onChange={evt => this.props.changeRegisterName(evt.target.value)}
                    id="register-name"
                    label="Name"
                    className="register-textfield"
                    margin="normal"
                />
                <TextField
                    required
                    value={this.props.register.UserEmail}
                    onChange={evt => this.props.changeRegisterEmail(evt.target.value)}
                    id="register-email"
                    label="Email"
                    className="register-textfield"
                    margin="normal"
                />
                <TextField
                    required
                    value={this.props.register.UserPassword}
                    onChange={evt => this.props.changeRegisterPassword(evt.target.value)}
                    id="register-password"
                    label="Password"
                    className="register-textfield"
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
        const steps = this.getSteps();
        return (
            <div className="register">
                <Background />
                <div className="register-root">
                    <Stepper activeStep={this.props.ui.registerStepperState} orientation="vertical">
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        {this.getStepContent(index)}
                                        <div className="register-actionsContainer">
                                            <div>
                                                <Button
                                                    disabled={this.props.ui.registerStepperState === 0}
                                                    onClick={this.handleBack}
                                                    className="register-button"
                                                >
                                                    Back
                      </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleNext}
                                                    className="register-button"
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


export default connect(mapStateToProps, mapDispatchToProps)(Register);