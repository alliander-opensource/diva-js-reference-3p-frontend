import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconActionLabel from 'material-ui/svg-icons/action/label';
import IconSocialPerson from 'material-ui/svg-icons/social/person';

const style = {
  height: '100%',
  margin: 20,
};

const UserInfo = ({ attributes, lastUpdated }) => (
  <div id="user-panel">
    <Paper style={style}>
      <List>
        <ListItem primaryText="Disclosed attributes" leftIcon={<IconSocialPerson />} />
      </List>

      <Divider />

      <List>
        {attributes.map(a => (
          <ListItem
            key={a.rawvalue + a.id}
            primaryText={a.rawvalue}
            secondaryText={a.id}
            leftIcon={<IconActionLabel />}
          />
        ))
        }
        { attributes.length === 0 &&
          <ListItem primaryText="There are yet no attributes disclosed." />
        }
      </List>

      {lastUpdated &&
        <div>
          <Divider />
          <List>
            <ListItem>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
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
