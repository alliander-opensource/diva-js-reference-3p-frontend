import React from 'react';
import { withRouter } from 'react-router-dom';

import { Sign } from 'diva-react';

const SignPage = () => {
  const message = 'I owe you nothing';
  const attributesForSigning = [
    [
      [
        'irma-demo.MijnOverheid.address.street',
        'irma-demo.MijnOverheid.address.city',
      ],
    ],
  ];

  const label = 'Address, City';

  return (
    <Sign
      requiredAttributes={attributesForSigning}
      label={label}
      message={message}
      viewId="sign-1"
    />
  );
};

export default withRouter(SignPage);
