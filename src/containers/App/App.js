import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { WithDivaAuthorization } from 'diva-react';

import MyHome from '../../containers/MyHome/MyHome';

import './App.css';

import { actions } from '../../reducers/session-reducer';

const styles = {
  main: {
    minHeight: 200,
    margin: 20,
  },
};

class App extends Component {
  componentWillMount() {
    this.props.deauthenticate();
  }

  componentDidMount() {
    this.props.getSessionData();
  }

  deauthenticate() {
    this.props.deauthenticate();
  }

  render() {
    const {
      sessionId,
      attributes,
      error,
    } = this.props;

    return (
      <BrowserRouter>
        <div>
          { sessionId && (
            <Grid fluid>
              <Row>
                <Col xs style={{ textAlign: 'center', margin: '20px' }}>
                  <img src="http://www.warmtenetwerk.nl/assets/Uploads/gem.haarlem.jpg" alt="Logo Haarlem" style={{ width: '500px' }} />
                </Col>
              </Row>
              <Row>
                <Col xs>
                  <Paper style={styles.main} id="main-content">
                    <Route
                      exact
                      path="/"
                      component={WithDivaAuthorization(
                        attributes,
                        [
                          {
                            label: 'Burgerservicenummer',
                            attributes: ['pbdf.nijmegen.bsn.bsn'],
                          },
                        ],
                        'my-home-disclose',
                      )(MyHome)}
                    />
                  </Paper>
                </Col>
              </Row>
            </Grid>
          )}

          { error && (
            <div>
              <h3> Error: { error.reason } </h3>
              <i> { error.response.data } </i>
            </div>
          )}

          { !sessionId && !error && (
            <div> Loading </div>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  sessionId: PropTypes.string,
  attributes: PropTypes.objectOf(PropTypes.array),
  getSessionData: PropTypes.func,
  deauthenticate: PropTypes.func,
  error: PropTypes.shape({
    reason: PropTypes.string,
    response: PropTypes.object,
  }),
};

const mapStateToProps = state => state.session;

const mapDispatchToProps = {
  getSessionData: actions.getSessionData,
  deauthenticate: actions.deauthenticate,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
