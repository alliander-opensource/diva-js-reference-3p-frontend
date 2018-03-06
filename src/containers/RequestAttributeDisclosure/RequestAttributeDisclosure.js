import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { Row, Col } from 'react-flexbox-grid';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import IconActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import IconActionHelp from 'material-ui/svg-icons/action/help';
import IconActionInfo from 'material-ui/svg-icons/action/info';
import IconAlertError from 'material-ui/svg-icons/alert/error';

import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

import { fetchSession } from '../../actions';

class RequestAttributeDisclosure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disclosureStatus: 'PENDING',
      serverStatus: 'INITIALIZED',
      sessionStarted: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (!this.state.sessionStarted) {
      this.fetchQR();
    }
  }

  fetchQR = () => {
    const { requiredAttributes } = this.props;
    this.setState({
      disclosureStatus: 'PENDING',
      serverStatus: 'INITIALIZED',
      sessionStarted: true,
    });
    axios
      .post('/api/start-irma-session', {
        content: requiredAttributes
      }, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.data)
      .then(data => {
        if (this._isMounted) {
          this.setState({
            qrContent: data.qrContent,
          });
          this.startPolling(data.irmaSessionId);
        }
      });
  }

  startPolling = irmaSessionId => {
    const pollTimerId = setInterval(this.poll, 1000, irmaSessionId, this);
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
        self.setState({
          disclosureStatus: result.disclosureStatus,
          serverStatus: result.serverStatus,
          proofStatus: result.proofStatus,
        });
        switch (result.disclosureStatus) {
          case 'COMPLETED':
            setTimeout(() => { self.refreshSession() }, 2000);
            self.stopPolling();
            break;
          case 'ABORTED':
            self.stopPolling();
            break;
          default:
            break;
        }
      });
  }

  getDisclosureStatus(irmaSessionId) {
    return  axios
      .get(`/api/disclosure-status?irmaSessionId=${irmaSessionId}`, {
        withCredentials: true,
      })
      .then(response => response.data);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.stopPolling();
  }

  refreshSession() {
    this.props.dispatch(fetchSession());
  }

  render() {
    const { requiredAttributes } = this.props;
    const {
      qrContent,
      disclosureStatus,
      proofStatus,
      serverStatus
    } = this.state;

    return (
      <div>
        {qrContent ? (
          <div>

            {(disclosureStatus === 'PENDING') && (
              <div>

                <Toolbar style={{ backgroundColor: 'none' }}>
                  <ToolbarGroup>
                    <ToolbarTitle text='Attribute Required' />
                  </ToolbarGroup>
                  <ToolbarGroup lastChild={true}>
                    <IconButton tooltip="Help">
                      <IconActionHelp/>
                    </IconButton>
                    <IconButton tooltip="Info">
                      <IconActionInfo/>
                    </IconButton>
                  </ToolbarGroup>
                </Toolbar>

                {(serverStatus === 'INITIALIZED') && (
                  <div style={{ padding: '20px' }}>
                    <Row center="xs">
                      <Col xs={6}>
                        Om uw toestemmingen te bekijken moet u de volgende attributen tonen:<br/>
                        <br />
                        <b>{requiredAttributes.map(el => el.label).join(', ')}</b><br />
                        <br/>
                      </Col>
                    </Row>
                    <Row center="xs">
                      <Col xs>
                        <QRCode value={JSON.stringify(qrContent)} size={256}/><br/>
                        <span style={{display: 'none'}} id="qr-content">{JSON.stringify(qrContent)}</span>
                        <br/>
                      </Col>
                    </Row>
                    <Row center="xs">
                      <Col xs={6}>
                        Scan de QR-code met de IRMA app om door te gaan.
                        <br/>
                      </Col>
                    </Row>
                  </div>
                )}

                {(serverStatus === 'CONNECTED') && (
                  <div style={{ padding: '20px' }} id='qr-scanned'>
                    <Row center="xs">
                      <Col xs={6}>
                        Om verder te gaan, ga akkoord met het verzoek in de IRMA-app.<br/>
                        <br/>
                      </Col>
                    </Row>
                  </div>
                )}

              </div>
            )}

            {(disclosureStatus === 'COMPLETED') && (
              <div>
                {(proofStatus === 'VALID') ? (
                  <div id='disclosure-proof-completed'>
                    <Row center="xs">
                      <Col xs>
                        <IconActionCheckCircle style={{ width: '100px', height: '100px', color: 'limegreen'}}/>
                      </Col>
                    </Row>
                    <Row center="xs">
                      <Col xs={6}>
                        Attributen succesvol getoond!
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <div id="disclosure-error">
                    <Row center="xs">
                      <Col xs>
                        <IconAlertError style={{ width: '100px', height: '100px', color: 'orangered'}}/>
                      </Col>
                    </Row>
                    <Row center="xs">
                      <Col xs={6}>
                        Er is iets misgegaan!<br/>
                        <br/>
                        <RaisedButton label="Retry"
                          primary={true} style={{}}
                          onClick={() => this.fetchQR()}/>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            )}
            {(disclosureStatus === 'ABORTED') && (
              <div>
              <Toolbar style={{ backgroundColor: 'none' }}>
                <ToolbarGroup>
                  <ToolbarTitle text="Attributen tonen geannuleerd" />
                </ToolbarGroup>
                <ToolbarGroup lastChild={true}>
                  <IconButton tooltip="Help">
                    <IconActionHelp/>
                  </IconButton>
                  <IconButton tooltip="Info">
                    <IconActionInfo/>
                  </IconButton>
                </ToolbarGroup>
              </Toolbar>

                {(serverStatus === 'CANCELLED') && (
                  <div style={{ padding: '20px' }} id="disclosure-cancelled">
                    <Row center="xs">
                      <Col xs={6}>
                        Je hebt het tonen van attributen geannuleerd.<br/>
                        <br/>
                        <RaisedButton label="Retry"
                          primary={true} style={{}}
                          onClick={() => this.fetchQR()}/>
                        <br/>
                      </Col>
                    </Row>
                  </div>
                )}

                {(serverStatus === 'NOT_FOUND') && (
                  <div style={{ padding: '20px' }} id="qr-expired">
                    <Row center="xs">
                      <Col xs={6}>
                        De QR code is verlopen.<br/>
                        <br/>
                        <RaisedButton label="Retry"
                          primary={true} style={{}}
                          onClick={() => this.fetchQR()}/>
                        <br/>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <Row center="xs">
              <Col xs>
                <CircularProgress/>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

RequestAttributeDisclosure.propTypes = {
  requiredAttributes: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(connect()(RequestAttributeDisclosure));
