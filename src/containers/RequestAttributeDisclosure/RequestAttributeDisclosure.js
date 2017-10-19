import React, { Component } from 'react';
import { connect } from 'react-redux'
import QRCode from 'qrcode.react';

class RequestAttributeDisclosure extends Component {
  render() {
    return (
      <QRCode value="IRMA is awesome" size="256"/>
    );
  }
}

export default RequestAttributeDisclosure;
