import React from 'react';
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconActionHome from 'material-ui/svg-icons/action/home';
import IconActionInfo from 'material-ui/svg-icons/action/info';

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
              <ListItem primaryText="Home" leftIcon={<IconActionHome />} />
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/user-info">
              <ListItem primaryText="User Info" rightIcon={<IconActionInfo />} />
            </Link>
          </List>
        </Paper>
      </div>
    );
  }
}
