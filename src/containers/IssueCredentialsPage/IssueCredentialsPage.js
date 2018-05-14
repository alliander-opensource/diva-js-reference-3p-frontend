import React from 'react';
import { withRouter } from 'react-router-dom';

import IssueCredentials from '../../diva-react/containers/IssueCredentials/IssueCredentials';

const IssueCredentialsPage = () => (
  <IssueCredentials
    credentialType="BRP1"
  />
);

export default withRouter(IssueCredentialsPage);
