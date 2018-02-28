import React from 'react';

import SignPolicy from '../SignPolicy/SignPolicy';

const onSigningComplete = (result) => {
  console.log(result);
};

const SignPolicyPage = () => {
  const message = "I owe you nothing";
  const attributesForSigning = [{
    label: 'Address',
    attributes: ['pbdf.pbdf.idin.address'],
  },{
    label: 'City',
    attributes: ['pbdf.pbdf.idin.city'],
  }];

  return (
    <SignPolicy requiredAttributes={attributesForSigning} message={message}
      onComplete={onSigningComplete}/>
  )
};

export default SignPolicyPage;
