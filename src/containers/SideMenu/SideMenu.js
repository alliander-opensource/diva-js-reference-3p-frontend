import React from 'react';
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconActionHome from 'material-ui/svg-icons/action/home';
import IconSocialPerson from 'material-ui/svg-icons/social/person';

export default class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    const style = {
      height: '100%',
      margin: 20,
    };

    return (
      <div>
        <Paper style={style}>
          <List>
            <Link to="/">
              <ListItem primaryText="Navigation menu"/>
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/my-home">
              <ListItem primaryText="My Home" leftIcon={<IconActionHome />} />
            </Link>
            <Link to="/my-account">
              <ListItem primaryText="My account" leftIcon={<IconSocialPerson />} />
            </Link>
          </List>
        </Paper>
      </div>
    );
  }
}