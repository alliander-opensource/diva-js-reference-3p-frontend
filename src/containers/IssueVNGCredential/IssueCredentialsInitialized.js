import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { Row, Col } from 'react-flexbox-grid';

const IssueCredentialsInitialized = ({ qrContent }) => (
  <div style={{ padding: '20px' }}>
    <Row center="xs">
      <Col xs>
        <QRCode value={JSON.stringify(qrContent)} size={384} /><br />
        <span style={{ display: 'none' }} id="qr-content">{JSON.stringify(qrContent)}</span>
        <br />
      </Col>
    </Row>
  </div>
);

IssueCredentialsInitialized.propTypes = {
  qrContent: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default IssueCredentialsInitialized;
