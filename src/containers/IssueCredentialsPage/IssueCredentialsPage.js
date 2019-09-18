import React from 'react';
import { withRouter } from 'react-router-dom';

import { IssueCredentials } from 'diva-react';

const IssueCredentialsPage = () => (
  <IssueCredentials
    viewId="issue-brp1"
    credentials={
      [{
        credential: 'irma-demo.MijnOverheid.address',
        attributes: {
          country: 'The Netherlands',
          city: 'The Hague',
          street: 'Lange Poten 4',
          zipcode: '2511 CL',
        },
      }]
    }
  />
);

export default withRouter(IssueCredentialsPage);
