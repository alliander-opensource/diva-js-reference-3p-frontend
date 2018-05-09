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

import withSimpleDivaAuthorization from '../../diva-react/WithSimpleDivaAuthorization';
import withDivaAuthorization from '../../diva-react/WithDivaAuthorization';

import SideMenu from '../../components/SideMenu/SideMenu';

import Home from '../../containers/Home/Home';
import MyAccount from '../../containers/MyAccount/MyAccount';
import MyHome from '../../containers/MyHome/MyHome';
import UserInfo from '../../containers/UserInfo/UserInfo';
import SignPolicyPage from '../SignPolicyPage/SignPolicyPage';

import { deauthenticate } from '../../actions';

import './App.css';

const styles = {
  main: {
    minHeight: 200,
    margin: 20,
  },
};

class App extends Component {
  handleDeauth() {
    const { dispatch } = this.props;
    dispatch(deauthenticate());
  }

  render() {
    const { user } = this.props;

    const RightMenu = props => (
      <IconMenu
        id="user-menu"
        {...props}
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
          onClick={() => this.handleDeauth()}
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
          <Grid fluid>
            <Row>
              <Col xs={12} sm={3}>
                <SideMenu />
              </Col>

              <Col xs>
                <Paper style={styles.main} id="main-content">
                  <Route exact path="/" component={Home}/>
                  <Route path="/my-home" component={withDivaAuthorization({
                    attributes: user.attributes,
                    requiredAttributes: [
                      {
                        label: 'Address',
                        attributes: ['pbdf.pbdf.idin.address'],
                      },{
                        label: 'City',
                        attributes: ['pbdf.pbdf.idin.city'],
                      },
                    ]
                  })(MyHome)}/>
                  <Route path="/my-account" component={withSimpleDivaAuthorization(user.attributes, 'pbdf.pbdf.email.email')(MyAccount)}/>
                  <Route path="/new-policy" component={SignPolicyPage}/>
                </Paper>
              </Col>

              <Col xs={12} sm={3}>
                <UserInfo />
              </Col>
            </Row>
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect(state => ({ user: state.user }))(App);
