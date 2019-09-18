import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// Material UI icons
import IconActionHome from '@material-ui/icons/Home';
import IconSocialPerson from '@material-ui/icons/Person';
import IconAssignmentReturned from '@material-ui/icons/AssignmentReturned';
import IconAddLocation from '@material-ui/icons/AddLocation';
import IconCreate from '@material-ui/icons/Create';
import IconDirectionsCar from '@material-ui/icons/DirectionsCar';
import IconPermIdentity from '@material-ui/icons/PermIdentity';

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
            <ListItem button>
              <ListItemText primary="Navigation menu" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link to="/my-home">
            <ListItem button>
              <ListItemIcon><IconActionHome /></ListItemIcon>
              <ListItemText primary="My Home" />
            </ListItem>
          </Link>
          <Link to="/my-account">
            <ListItem button>
              <ListItemIcon><IconSocialPerson /></ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link to="/sign">
            <ListItem button>
              <ListItemIcon><IconCreate /></ListItemIcon>
              <ListItemText primary="Signing" />
            </ListItem>
          </Link>
          <Link to="/issue">
            <ListItem button>
              <ListItemIcon><IconAddLocation /></ListItemIcon>
              <ListItemText primary="Issue Address" />
            </ListItem>
          </Link>
          <Link to="/issue-ean">
            <ListItem button>
              <ListItemIcon><IconAssignmentReturned /></ListItemIcon>
              <ListItemText primary="Issue EAN" />
            </ListItem>
          </Link>
          <Link to="/issue-vrn">
            <ListItem button>
              <ListItemIcon><IconDirectionsCar /></ListItemIcon>
              <ListItemText primary="Issue VRN" />
            </ListItem>
          </Link>
          <Link to="/issue-bsn">
            <ListItem button>
              <ListItemIcon><IconPermIdentity /></ListItemIcon>
              <ListItemText primary="Issue BSN" />
            </ListItem>
          </Link>
        </List>
      </Paper>
    </div>
  );
};

export { SideMenu as default };
