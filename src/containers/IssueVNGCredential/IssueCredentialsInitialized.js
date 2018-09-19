import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { Row, Col } from 'react-flexbox-grid';

const IssueCredentialsInitialized = ({ qrContent }) => (
  <div style={{ padding: '20px' }}>
    <Row center="xs">
      <Col xs={6}>
        <h2>Verkrijg hier uw Fieldlabdeelnemer-attribuut!</h2><br />
        <br />
      </Col>
    </Row>
    <Row center="xs">
      <Col xs>
        <QRCode value={JSON.stringify(qrContent)} size={256} /><br />
        <span style={{ display: 'none' }} id="qr-content">{JSON.stringify(qrContent)}</span>
        <br />
      </Col>
    </Row>
    <Row center="xs">
      <Col xs={6}>
        Scan de code met uw IRMA app om het VNG fieldlab-deelnemer credential te ontvangen.
        <br />
      </Col>
    </Row>
  </div>
);

IssueCredentialsInitialized.propTypes = {
  qrContent: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default IssueCredentialsInitialized;
