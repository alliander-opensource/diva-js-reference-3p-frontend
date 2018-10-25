import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconActionHome from 'material-ui/svg-icons/action/home';
import IconSocialPerson from 'material-ui/svg-icons/social/person';
import IconAssignmentReturned from 'material-ui/svg-icons/action/assignment-returned';
import IconAddLocation from 'material-ui/svg-icons/maps/add-location';
import IconCreate from 'material-ui/svg-icons/content/create';
import IconDirectionsCar from 'material-ui/svg-icons/maps/directions-car';
import IconPermIdentity from 'material-ui/svg-icons/action/perm-identity';

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
        <Divider />
        <List>
          <Link to="/sign">
            <ListItem primaryText="Signing" leftIcon={<IconCreate />} />
          </Link>
          <Link to="/issue">
            <ListItem primaryText="Issue Address" leftIcon={<IconAddLocation />} />
          </Link>
          <Link to="/issue-ean">
            <ListItem primaryText="Issue EAN" leftIcon={<IconAssignmentReturned />} />
          </Link>
          <Link to="/issue-vrn">
            <ListItem primaryText="Issue VRN" leftIcon={<IconDirectionsCar />} />
          </Link>
          <Link to="/issue-bsn">
            <ListItem primaryText="Issue BSN" leftIcon={<IconPermIdentity />} />
          </Link>
        </List>
      </Paper>
    </div>
  );
};

export { SideMenu as default };
