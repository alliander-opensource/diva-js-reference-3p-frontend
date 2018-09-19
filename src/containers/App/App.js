import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import IssueCredentialsPage from '../IssueVNGCredential/IssueCredentialsPage';

import './App.css';

import { actions } from '../../reducers/session-reducer';

class App extends Component {
  componentDidMount() {
    this.props.getSessionData();
  }

  deauthenticate() {
    this.props.deauthenticate();
  }

  render() {
    const {
      sessionId,
      error,
    } = this.props;

    return (
      <BrowserRouter>
        <div>
          { sessionId && (
            <div>
              <Route path="/" component={IssueCredentialsPage} />
            </div>
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
