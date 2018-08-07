import React from 'react';
import { withRouter } from 'react-router-dom';

import { Sign } from '../../diva-react';

const SignPage = () => {
  const message = 'I owe you nothing';
  const attributesForSigning = [{
    label: 'Address',
    attributes: ['irma-demo.MijnOverheid.address.street'],
  }, {
    label: 'City',
    attributes: ['irma-demo.MijnOverheid.address.city'],
  }];

  return (
    <Sign
      requiredAttributes={attributesForSigning}
      message={message}
      viewId="sign-1"
    />
  );
};

export default withRouter(SignPage);
