import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { Row, Col } from 'react-flexbox-grid';
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
    const { requiredAttribute } = this.props;
    this.setState({
      disclosureStatus: 'PENDING',
      serverStatus: 'INITIALIZED',
      sessionStarted: true,
    });
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
        if (result.disclosureStatus === 'COMPLETED' ||
            result.disclosureStatus === 'ABORTED') {
          self.stopPolling();
          setTimeout(() => { self.refreshSession() }, 2000);
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
    console.log('STATE', this.state);
    const { requiredAttribute } = this.props;
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
                        In order to view this page, the <b>{requiredAttribute}</b> attribute is required.<br/>
                        <br/>
                      </Col>
                    </Row>
                    <Row center="xs">
                      <Col xs>
                        <QRCode value={JSON.stringify(qrContent)} size={256}/><br/>
                        <br/>
                      </Col>
                    </Row>
                    <Row center="xs">
                      <Col xs={6}>
                        Please scan the QR code with your IRMA app to continue.
                        <br/>
                      </Col>
                    </Row>
                  </div>
                )}

                {(serverStatus === 'CONNECTED') && (
                  <div style={{ padding: '20px' }}>
                    <Row center="xs">
                      <Col xs={6}>
                        To continue, approve attribute disclosure with your IRMA app.<br/>
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
                  <div>
                    <Row center="xs">
                      <Col xs>
                        <IconActionCheckCircle style={{ width: '100px', height: '100px', color: 'limegreen'}}/>
                      </Col>
                    </Row>
                    <Row center="xs">
                      <Col xs={6}>
                        Attribute disclosure successful!
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <div>
                    <Row center="xs">
                      <Col xs>
                        <IconAlertError style={{ width: '100px', height: '100px', color: 'orangered'}}/>
                      </Col>
                    </Row>
                    <Row center="xs">
                      <Col xs={6}>
                        Oops, something went wrong!<br/>
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
                  <ToolbarTitle text="Disclosure cancelled" />
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
                  <div style={{ padding: '20px' }}>
                    <Row center="xs">
                      <Col xs={6}>
                        You cancelled attribute disclosure.<br/>
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
                  <div style={{ padding: '20px' }}>
                    <Row center="xs">
                      <Col xs={6}>
                        The QR code expired.<br/>
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
  requiredAttribute: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(connect()(RequestAttributeDisclosure));
