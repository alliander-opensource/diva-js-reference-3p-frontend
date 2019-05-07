import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Material UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import IconSocialPerson from '@material-ui/icons/Person';

class RightMenu extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { deauthenticate } = this.props;
    const { anchorEl } = this.state;

    return (
      <Fragment>
        <IconButton
          id="navbar-user-icon"
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <IconSocialPerson style={{ color: 'black' }} />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Link to="/">
            <MenuItem>About</MenuItem>
          </Link>
          <MenuItem
            id="deauthenticate-button"
            onClick={() => deauthenticate()}
          >
          Clear session
          </MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

RightMenu.propTypes = {
  deauthenticate: PropTypes.func.isRequired,
};

export default RightMenu;
