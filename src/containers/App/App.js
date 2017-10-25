import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import IconSocialPerson from 'material-ui/svg-icons/social/person';
import { Row, Col } from 'react-flexbox-grid';

import WithDivaAuthorization from '../../util/WithDivaAuthorization';

import  SideMenu from '../../containers/SideMenu/SideMenu';

import  Home from '../../containers/Home/Home';
import  MyAccount from '../../containers/MyAccount/MyAccount';
import  MyHome from '../../containers/MyHome/MyHome';
import  UserInfo from '../../containers/UserInfo/UserInfo';

import './App.css';

const styles = {
  main: {
    minHeight: 200,
    margin: 20,
    padding: 20,
  },
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
      showUserInfo: true,
    };
  }

  toggleMenu() {
    this.setState(previousState => {
      return {
        showMenu: !previousState.showMenu
      };
    });
  }

  toggleUserInfo() {
    this.setState(previousState => {
      return {
        showUserInfo: !previousState.showUserInfo
      };
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBar
            title="DIVA 3rd party reference implementation"
            iconElementRight={<IconButton><IconSocialPerson/></IconButton>}
            onLeftIconButtonTouchTap={ () => this.toggleMenu() }
            onRightIconButtonTouchTap={ () => this.toggleUserInfo() }
          />
          <Row>
            {
              this.state.showMenu &&
              <Col xs={12} sm={3}>
                <SideMenu/>
              </Col>
            }

            <Col xs>
              <Paper style={styles.main}>
                <Route exact path="/" component={Home}/>
                <Route path="/my-home" component={WithDivaAuthorization('pbdf.pbdf.idin.address')(MyHome)}/>
                <Route path="/my-account" component={WithDivaAuthorization('pbdf.pbdf.email.email')(MyAccount)}/>
              </Paper>
            </Col>

            {
              this.state.showUserInfo &&
              <Col xs={12} sm={3}>
                <UserInfo/>
              </Col>
            }
          </Row>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
