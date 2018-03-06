import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import IconSocialPerson from 'material-ui/svg-icons/social/person';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col } from 'react-flexbox-grid';

import WithSimpleDivaAuthorization from '../../util/WithSimpleDivaAuthorization';
import WithDivaAuthorization from '../../util/WithDivaAuthorization';

import  SideMenu from '../../components/SideMenu/SideMenu';

import  Home from '../../containers/Home/Home';
import  MyAccount from '../../containers/MyAccount/MyAccount';
import  MyHome from '../../containers/MyHome/MyHome';
import  MyPolicies from '../../containers/MyPolicies/MyPolicies';
import SignPolicyPage from '../SignPolicyPage/SignPolicyPage';
import HhbEnroll from '../HhbEnroll/HhbEnroll';

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
    const RightMenu = (props) => (
      <IconMenu id="user-menu"
        {...props}
        iconButtonElement={
          <IconButton id="navbar-user-icon">
            <IconSocialPerson style={{color: 'red'}}/>
          </IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <Link to='/'>
          <MenuItem primaryText="About" />
        </Link>
        <MenuItem primaryText="Clear session"
          id="deauthenticate-button"
          onClick={ () => this.handleDeauth() }
        />
      </IconMenu>
    );

    return (
      <BrowserRouter>
        <div>
          <AppBar
            title="Huishoudboekje incheckapp"
            iconElementRight={<RightMenu/>}
          />
          <Grid fluid>
            <Row>
              <Col xs={12} sm={3}>
                <SideMenu/>
              </Col>

              <Col xs>
                <Paper style={styles.main} id="main-content">
                  <Route exact path="/" component={Home}/>
                  <Route path="/my-home" component={WithDivaAuthorization([
                    {
                      label: 'Address',
                      attributes: ['irma-demo.idin.idin.address'],
                    },{
                      label: 'City',
                      attributes: ['irma-demo.idin.idin.city'],
                    },
                  ])(MyHome)}/>
                  <Route path="/my-account" component={WithSimpleDivaAuthorization('irma-demo.email.email')(MyAccount)}/>
                  <Route path="/my-policies" component={WithDivaAuthorization([
                    {
                      label: 'Voorletters',
                      attributes: ['irma-demo.idin.idin.initials'],
                    },{
                      label: 'Achternaam',
                      attributes: ['irma-demo.idin.idin.familyname'],
                    },{
                      label: 'BSN',
                      attributes: ['irma-demo.MijnOverheid.root.BSN'],
                    },
                  ])(MyPolicies)}/>
                  <Route path="/new-policy" component={SignPolicyPage}/>
                  <Route path="/hhb-enroll" component={HhbEnroll}/>
                </Paper>
              </Col>

             {/*<Col xs={12} sm={3}>
                <UserInfo/>
              </Col>*/}
            </Row>
          </Grid>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect()(App);
