import React from 'react';
import { withRouter } from 'react-router-dom';

import { IssueCredentials } from 'diva-react';

const IssueBsnPage = () => (
  <IssueCredentials
    viewId="issue-bsn"
    credentials={
      [{
        credential: 'irma-demo.nijmegen.bsn',
        attributes: {
          bsn: '302641828',
        },
      }]
    }
  />
);

export default withRouter(IssueBsnPage);
