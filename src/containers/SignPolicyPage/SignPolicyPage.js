import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import SignPolicy from '../SignPolicy/SignPolicy';

const onSigningComplete = (result) => {
  console.log('Succes: ', result);
};
const onSigningFailure = (result) => {
  console.log('Error: ', result);
};

const onSigningFailed = (result) => {
  console.log(result);
};

const SignPolicyPage = () => {
  let params = queryString.parse(this.props.location.search);
  const message = "I owe you nothing";
  const attributesForSigning = [{
    label: 'Address',
    attributes: ['pbdf.pbdf.idin.address'],
  },{
    label: 'City',
    attributes: ['pbdf.pbdf.idin.city'],
  }];

  return (
    <SignPolicy
      requiredAttributes={attributesForSigning}
      message={message}
      onComplete={onSigningComplete}
      onFailure={onSigningFailure}
    />
  )
};

export default withRouter(SignPolicyPage);
