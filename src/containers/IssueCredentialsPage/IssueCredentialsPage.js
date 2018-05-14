import React from 'react';
import { withRouter } from 'react-router-dom';

import IssueCredentials from '../../diva-react/containers/IssueCredentials/IssueCredentials';

const IssueCredentialsPage = () => {
  return (
    <IssueCredentials
      credentialType="BRP1"
    />
  )
};

export default withRouter(IssueCredentialsPage);
