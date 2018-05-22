import React from 'react';
import { withRouter } from 'react-router-dom';

import Sign from '../../diva-react/containers/Sign/Sign';

const SignPage = () => {
  const message = 'I owe you nothing';
  const attributesForSigning = [{
    label: 'Address',
    attributes: ['pbdf.pbdf.idin.address'],
  }, {
    label: 'City',
    attributes: ['pbdf.pbdf.idin.city'],
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
