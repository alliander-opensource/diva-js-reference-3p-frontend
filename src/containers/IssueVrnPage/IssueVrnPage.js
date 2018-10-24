import React from 'react';
import { withRouter } from 'react-router-dom';

import { IssueCredentials } from 'diva-react';

const IssueVrnPage = () => (
  <IssueCredentials
    viewId="issue-vrn"
    credentialType="VRN"
  />
);

export default withRouter(IssueVrnPage);
