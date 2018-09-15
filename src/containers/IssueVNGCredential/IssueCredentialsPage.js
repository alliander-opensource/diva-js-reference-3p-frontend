import React from 'react';
import { withRouter } from 'react-router-dom';

import IssueCredentials from './IssueCredentials';

const IssueCredentialsPage = () => (
  <IssueCredentials
    viewId="issue-fieldlab"
    credentialType="FIELDLAB"
  />
);

export default withRouter(IssueCredentialsPage);
