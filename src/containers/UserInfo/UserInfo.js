import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconActionLabel from '@material-ui/icons/Label';
import IconSocialPerson from '@material-ui/icons/Person';

const style = {
  height: '100%',
  margin: 20,
};

const UserInfo = ({ attributes, lastUpdated }) => (
  <div id="user-panel">
    <Paper style={style}>
      <List>
        <ListItem>
          <ListItemIcon><IconSocialPerson /></ListItemIcon>
          <ListItemText primary="Disclosed attributes" />
        </ListItem>
      </List>

      <Divider />

      <List>
        {attributes.map(a => (
          <ListItem key={a.rawvalue + a.id}>
            <ListItemText
              primary={a.rawvalue}
              secondary={a.id}
            />
            <ListItemIcon><IconActionLabel /></ListItemIcon>
          </ListItem>
        ))
        }
        { attributes.length === 0 &&
          <ListItem primary="There are yet no attributes disclosed." />
        }
      </List>

      {lastUpdated &&
        <div>
          <Divider />
          <List>
            <ListItem>
              <ListItemText>
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              </ListItemText>
            </ListItem>
          </List>
        </div>
      }

    </Paper>
  </div>
);

UserInfo.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
  lastUpdated: PropTypes.number,
};

const mapStateToProps = state => ({ attributes: state.divaReducer.attributes });

export default connect(mapStateToProps)(UserInfo);
