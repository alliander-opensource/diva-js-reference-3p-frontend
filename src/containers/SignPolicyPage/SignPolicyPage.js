import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

import SignPolicy from '../SignPolicy/SignPolicy';

const onSigningComplete = (result) => {
  console.log('Succes: ', result);
};
const onSigningFailure = (result) => {
  console.log('Error: ', result);
};

class SignPolicyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributesForSigning: [{
        label: 'Address',
        attributes: ['pbdf.pbdf.idin.address'],
      },{
        label: 'City',
        attributes: ['pbdf.pbdf.idin.city'],
      }],
    };
  }

  componentDidMount() {
    // this._isMounted = true;
    // if (!this.state.sessionStarted) {
    this.fetchMessage();
    // }
  }

  fetchMessage = () => {
    const actorId = queryString.parse(this.props.location.search)['spId'];
    const policy = {
      actorId,
      action: "lezen",
      actee: "mijn inkomensgegevens",
      conditions: [],
      goal: "om mijn financiën te regelen."
    };
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };
    axios
      .post('/api/policy/get-message-for-policy', policy, options)
      .then(response => response.data)
      .then(data => {
        // if (this._isMounted) {
          this.setState({
            message: data.message,
          });
        // }
      });
  }

  render() {
    const { message, attributesForSigning } = this.state;

    return message ? (
      <SignPolicy
        requiredAttributes={attributesForSigning}
        message={message}
        onComplete={onSigningComplete}
        onFailure={onSigningFailure}
      />
    ) : "Generating policy."
  }
}

export default withRouter(SignPolicyPage);
