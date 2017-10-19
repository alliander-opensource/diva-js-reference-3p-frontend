import React, { Component } from 'react';
import QRCode from 'qrcode.react';

import { Row, Col } from 'react-flexbox-grid';
class RequestAttributeDisclosure extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { requiredAttribute } = this.props;
    fetch(`/api/attributes-required?type=json&attribute=${requiredAttribute}&attributesLabel=${requiredAttribute}`, {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        qrContent: data,
      })
    });
  }

  render() {
    const { requiredAttribute } = this.props;
    const { qrContent } = this.state;

    return (
      <div>
        {qrContent ? (
          <Row center="xs">
            <Col xs={6}>
              In order to view this page, the <b>{requiredAttribute}</b> attribute is required.<br/>
              <br/>
              <QRCode value={qrContent} size={256}/><br/>
              <br/>
              Please scan the QR code with your IRMA app to continue.
            </Col>
          </Row>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}

export default RequestAttributeDisclosure;
