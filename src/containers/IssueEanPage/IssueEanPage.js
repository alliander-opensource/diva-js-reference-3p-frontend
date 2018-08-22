import React from 'react';
import { withRouter } from 'react-router-dom';

import { IssueCredentials } from '../../diva-react';

const IssueEanPage = () => (
  <IssueCredentials
    viewId="issue-ean"
    credentialType="EAN"
  />
);

export default withRouter(IssueEanPage);
