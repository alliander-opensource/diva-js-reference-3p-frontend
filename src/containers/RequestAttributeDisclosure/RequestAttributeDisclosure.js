import React, { Component } from 'react';
import QRCode from 'qrcode.react';

import { Row, Col } from 'react-flexbox-grid';
class RequestAttributeDisclosure extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;
    const { requiredAttribute } = this.props;

    fetch(`/api/start-disclosure-session?attribute=${requiredAttribute}&attributesLabel=${requiredAttribute}`, {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      if (this._isMounted) { // TODO: move to redux actions
        this.setState({
          qrContent: data.qrContent,
        });
        this.startPoll(data.irmaSessionId);
        setTimeout(this.stopPoll, 150000);
      }
    });
  }

  startPoll = irmaSessionId => {
    const pollTimerId = setInterval(this.poll, 3000, irmaSessionId, this);
    this.setState({ pollTimerId });
  }

  stopPoll = () => {
    if (this.state.pollTimerId) {
      clearInterval(this.state.pollTimerId);
      this.setState({ pollTimerId: undefined });
    }
  }

  poll(irmaSessionId, self) {
    self
      .getDisclosureStatus(irmaSessionId)
      .then(result => {
        console.log(result);
        self.setState({
          disclosureStatus: result.disclosureStatus,
          proofStatus: result.proofStatus,
        });
      });
  }

  getDisclosureStatus(irmaSessionId) {
    return fetch(`/api/disclosure-status?irmaSessionId=${irmaSessionId}`, {
      credentials: 'include'
    })
    .then(response => response.json());
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { requiredAttribute } = this.props;
    const { qrContent, disclosureStatus, proofStatus } = this.state;

    return (
      <div>
        {qrContent ? (
          <Row center="xs">
            {(disclosureStatus !== "COMPLETED") ? (
              <Col xs={6}>
                In order to view this page, the <b>{requiredAttribute}</b> attribute is required.<br/>
                <br/>
                <QRCode value={JSON.stringify(qrContent)} size={256}/><br/>
                <br/>
                Please scan the QR code with your IRMA app to continue.
              </Col>
            ) : (
              <Col xs={6}>

                Status: { disclosureStatus }<br/>
                <br/>
                Result: { proofStatus }

              </Col>
            )}
          </Row>
        ) : ("Loading...")}
      </div>
    );
  }
}

export default RequestAttributeDisclosure;
