import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import IconSocialPerson from 'material-ui/svg-icons/social/person';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { WithSimpleDivaAuthorization, WithDivaAuthorization, actions as divaActions } from 'diva-react';

import SideMenu from '../../components/SideMenu/SideMenu';

import Home from '../../containers/Home/Home';
import MyAccount from '../../containers/MyAccount/MyAccount';
import MyHome from '../../containers/MyHome/MyHome';
import UserInfo from '../../containers/UserInfo/UserInfo';
import SignPage from '../SignPage/SignPage';
import IssueCredentialsPage from '../IssueCredentialsPage/IssueCredentialsPage';
import IssueBsnPage from '../IssueBsnPage/IssueBsnPage';
import IssueVrnPage from '../IssueVrnPage/IssueVrnPage';
import IssueEanPage from '../IssueEanPage/IssueEanPage';

import './App.css';

const styles = {
  main: {
    minHeight: 200,
    margin: 20,
  },
};

class App extends Component {
  deauthenticate() {
    this.props.deauthenticate(); // TODO: abandon all running sessions once clearSession() is fired!
  }

  render() {
    const {
      attributes,
      // error,
    } = this.props;

    const error = undefined;

    const RightMenu = () => (
      <IconMenu
        id="user-menu"
        iconButtonElement={
          <IconButton id="navbar-user-icon">
            <IconSocialPerson style={{ color: 'red' }} />
          </IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Link to="/">
          <MenuItem primaryText="About" />
        </Link>
        <MenuItem
          primaryText="Clear session"
          id="deauthenticate-button"
          onClick={() => this.deauthenticate()}
        />
      </IconMenu>
    );

    return (
      <BrowserRouter>
        <div>
          <AppBar
            title="DIVA 3rd party reference implementation"
            iconElementRight={<RightMenu />}
          />
          { true && (
            <Grid fluid>
              <Row>
                <Col xs={12} sm={3}>
                  <SideMenu />
                </Col>

                <Col xs>
                  <Paper style={styles.main} id="main-content">
                    <Route exact path="/" component={Home} />
                    <Route
                      path="/my-home"
                      component={WithDivaAuthorization(
                        attributes,
                        [
                          {
                            label: 'Address',
                            attributes: ['irma-demo.MijnOverheid.address.street'],
                          }, {
                            label: 'City',
                            attributes: ['irma-demo.MijnOverheid.address.city'],
                          },
                        ],
                        'my-home-disclose',
                      )(MyHome)}
                    />
                    <Route path="/my-account" component={WithSimpleDivaAuthorization(attributes, 'pbdf.pbdf.email.email', 'Email')(MyAccount)} />
                    <Route path="/sign" component={SignPage} />
                    <Route path="/issue" component={IssueCredentialsPage} />
                    <Route path="/issue-bsn" component={IssueBsnPage} />
                    <Route path="/issue-vrn" component={IssueVrnPage} />
                    <Route
                      path="/issue-ean"
                      component={WithDivaAuthorization(
                        attributes,
                        [
                          {
                            label: 'iDin Address',
                            attributes: ['pbdf.pbdf.idin.address'],
                          }, {
                            label: 'iDin City',
                            attributes: ['pbdf.pbdf.idin.zipcode'],
                          },
                        ],
                        'issue-ean-disclose',
                      )(IssueEanPage)}
                    />
                  </Paper>
                </Col>

                <Col xs={12} sm={3}>
                  <UserInfo />
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
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.object),
  deauthenticate: PropTypes.func,
};

const mapStateToProps = state => ({
  attributes: state.divaReducer.attributes,
});

const mapDispatchToProps = {
  deauthenticate: divaActions.clearSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
