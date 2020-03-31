import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
} from '@material-ui/core';
import Spacer from './Spacer';

const useStyles = makeStyles((theme) => ({
  stepperRoot: {
    width: '100%',
  },
  stepperContent: {
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
  },
  stepperButtons: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  divider: {
    marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(3),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function ControlledStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === props.steps.length - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === props.steps.length;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          props.steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className={classes.stepperRoot}>
      <Stepper nonLinear activeStep={activeStep} style={{background: 'inherit'}}>
        {props.steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)} completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div className={classes.stepperContent}>
            {props.children[props.children.length - 1]}
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div className={classes.stepperContent}>
              {props.children[activeStep]}
            </div>
            <Spacer height={15} />
            <Divider className={classes.divider}/>
            <div className={classes.stepperButtons}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <div style={{float: 'right'}}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  Next
                </Button>
                {activeStep !== props.steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button variant="contained" color="primary" onClick={handleComplete}>
                      {completedSteps() === props.steps.length - 1 ? 'Finish' : 'Complete Step'}
                    </Button>
                  ))}
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
