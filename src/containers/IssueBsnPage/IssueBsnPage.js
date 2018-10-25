import React from 'react';
import { withRouter } from 'react-router-dom';

import { IssueCredentials } from 'diva-react';

const IssueBsnPage = () => (
  <IssueCredentials
    viewId="issue-bsn"
    credentialType="BSN"
  />
);

export default withRouter(IssueBsnPage);
