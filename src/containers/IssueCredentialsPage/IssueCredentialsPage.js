import React from 'react';
import { withRouter } from 'react-router-dom';

import IssueCredentials from '../../diva-react/containers/IssueCredentials/IssueCredentials';

const onSigningComplete = (result) => {
  console.log('Succes: ', result);
};
const onSigningFailure = (result) => {
  console.log('Error: ', result);
};

const IssueCredentialsPage = () => {
  return (
    <IssueCredentials
      credentialType='BRP1'
      onComplete={onSigningComplete}
      onFailure={onSigningFailure}
    />
  )
};

export default withRouter(IssueCredentialsPage);
