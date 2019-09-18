import React from 'react';
import { withRouter } from 'react-router-dom';

import { IssueCredentials } from 'diva-react';

const IssueVrnPage = () => (
  <IssueCredentials
    viewId="issue-vrn"
    credentials={
      [{
        credential: 'irma-demo.rdw.vrn',
        attributes: {
          vrn: '00-00-00',
        },
      }]
    }
  />
);

export default withRouter(IssueVrnPage);
