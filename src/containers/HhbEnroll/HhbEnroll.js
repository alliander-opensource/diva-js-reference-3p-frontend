import React, { Component } from 'react';
//import PropTypes from 'prop-types'
import axios from 'axios';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import SignPolicyPage from '../SignPolicyPage/SignPolicyPage';
import HnbForm from '../../components/HhbForm/HhbForm';

function sendDataToHhb(policy, formData) {
  const body = {
    Mail: formData.mail,
    Toestemming: policy,
    BSN: "FAKE017496111",
    Geboortedatum: "24-7-1978",
    Telefoon: "0601234567",
    Voorletters: "C",
    "Tussenvoegsel Achternaam": "Groen",
    Geslacht: "Vrouw",
    Postcode: "3511gd",
    Straat: "Gedeelde grond",
    Huisnummer: "5",
    Plaats: "Utrecht",
  };
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
  };
  return axios
   .post('/api/huishoudboekje/incheck', body, options)
   .then(response => response.data);
}

class HhbEnroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      error: false,
      formData: {
        mail: '',
      },
    };
  }

  validateForm = ()  => {
    return Object.keys(this.state.formData).every(el =>
      this.state.formData[el] !== ''
    );
  }

  handlePolicyAdded = (policy) => {
    const { stepIndex, formData } = this.state;
    sendDataToHhb(policy, formData)
    .then((result) => {
      this.setState({
        stepIndex: stepIndex + 1,
        username: result.data.username,
        password: result.data.password,
      });
    })
    .catch(error => {
      console.log('error: ', error);
      this.setState({
        stepIndex: stepIndex + 1,
        username: 'TODO: ERROR',
        password: 'TODO: ERROR',
      });
    });

  }

  // TODO: move?
  handleFormChange = (event) => {
    const { formData } = this.state;
    const { id, value } = event.target;
    this.setState({
      formData: {
        ...formData,
        [id]: value
      }
    });
  }

	handleNext = () => {
    const {stepIndex} = this.state;

    // Validate form in the first step
    if (stepIndex === 0 && !this.validateForm()) {
      this.setState({
        error: true
      });
      return;
    }

    this.setState({
      stepIndex: stepIndex + 1,
    });
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Gegevens invullen';
      case 1:
        return 'Toestemming ondertekenen';
      case 2:
        return 'Voltooien';
      default:
        return 'Er is iets fout gegaan, probeer opnieuw.';
    }
  }

  render() {
    const { stepIndex, error, formData, username, password } = this.state;
    return (
      <div>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>{this.getStepContent(0)}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{this.getStepContent(1)}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{this.getStepContent(2)}</StepLabel>
          </Step>
        </Stepper>
        {(stepIndex === 0) ? (
          <div>
            <HnbForm
              onChange={this.handleFormChange}
              formData={formData}
              error={error}
            />
          </div>
        ) : (
          <div>
          {(stepIndex === 1) ? (
            <div>
              <SignPolicyPage
                formData={formData}
                spId='hhb'
                onAdd={this.handlePolicyAdded}
              />
            </div>
          ) : (
            <div>
              Het incheckformulier en de toestemming zijn succesvol naar het huishoudboekje verstuurd.<br /><br />
              Uw inloggegevens:
              <ul>
              <li>Gebruikersnaam: {username}</li>
              <li>Wachtwoord: {password}</li>
              </ul>
              U kunt hiermee inloggen in het <a href="https://www.fjvanlunteren.nl/hhb/" target="_blank" rel="noopener noreferrer">Huishoudboekje</a>.<br />
            </div>
          )}
          </div>
        )}
        <FlatButton
          label="Vorige"
          disabled={stepIndex === 0}
          onClick={this.handlePrev}
        />
        <RaisedButton
          label="Volgende"
          disabled={stepIndex > 3}
          primary={true}
          onClick={this.handleNext}
        />
      </div>
    );
  }
}

HhbEnroll.propTypes = {
}

export default HhbEnroll;
