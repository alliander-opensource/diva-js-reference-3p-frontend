import React from 'react';
import { withRouter } from 'react-router-dom';

import { IssueCredentials } from '../../diva-react';

const IssueCredentialsPage = () => (
  <IssueCredentials
    viewId="issue-brp1"
    credentialType="BRP1"
  />
);

export default withRouter(IssueCredentialsPage);
