import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { Row, Col } from 'react-flexbox-grid';

import { fetchSession } from '../../actions';

class RequestAttributeDisclosure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionStarted: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const { requiredAttribute } = this.props;

    if (!this.state.sessionStarted) {
      fetch(`/api/start-disclosure-session?attribute=${requiredAttribute}&attributesLabel=${requiredAttribute}`, {
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({
            qrContent: data.qrContent,
          });
          this.startPolling(data.irmaSessionId);
          setTimeout(this.stopPolling, 30000);
        }
      });
    }
  }

  startPolling = irmaSessionId => {
    const pollTimerId = setInterval(this.poll, 3000, irmaSessionId, this);
    this.setState({ pollTimerId });
  }

  stopPolling = () => {
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
        if (result.disclosureStatus === 'COMPLETED') {
          self.stopPolling();
          setTimeout(() => { self.refreshSession() }, 2000);
        }
        if (this._isMounted) {
          self.setState({
            disclosureStatus: result.disclosureStatus,
            proofStatus: result.proofStatus,
          });
        }
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
    this.stopPolling();
  }

  refreshSession() {
    this.props.dispatch(fetchSession());
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

RequestAttributeDisclosure.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(connect()(RequestAttributeDisclosure));
