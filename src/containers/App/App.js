import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { WithSimpleDivaAuthorization, WithDivaAuthorization, actions as divaActions } from 'diva-react';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import SideMenu from '../../components/SideMenu/SideMenu';
import RightMenu from '../../components/RightMenu/RightMenu';
import Home from '../Home/Home';
import MyAccount from '../MyAccount/MyAccount';
import MyHome from '../MyHome/MyHome';
import UserInfo from '../UserInfo/UserInfo';
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

const App = ({ attributes, deauthenticate }) => (
  <BrowserRouter>
    <div>
      <AppBar position="static" style={{ background: '#00bcd4' }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" style={{ marginLeft: -12 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
            DIVA 3rd party reference implementation
          </Typography>
          <RightMenu deauthenticate={deauthenticate} />
        </Toolbar>
      </AppBar>
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
    </div>
  </BrowserRouter>
);

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
