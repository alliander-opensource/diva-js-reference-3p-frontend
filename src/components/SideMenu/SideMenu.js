import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconActionHome from 'material-ui/svg-icons/action/home';
import IconSocialPerson from 'material-ui/svg-icons/social/person';

const SideMenu = () => {
  const style = {
    height: '100%',
    margin: 20,
  };
  return (
    <div>
      <Paper style={style} id="navigation-menu">
        <List>
          <Link to="/">
            <ListItem primaryText="Navigation menu" />
          </Link>
        </List>
        <Divider />
        <List>
          <Link to="/my-home">
            <ListItem primaryText="My Home" leftIcon={<IconActionHome />} />
          </Link>
          <Link to="/my-account">
            <ListItem primaryText="My Account" leftIcon={<IconSocialPerson />} />
          </Link>
        </List>
      </Paper>
    </div>
  );
};

export { SideMenu as default };
