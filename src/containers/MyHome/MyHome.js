import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class MyHome extends Component {
  render() {
    const { street, houseNumber } = this.props;

    return (
      <div>
        <h2>Mijn Huis</h2>

        <br/><br/>
        Adres: { street } { houseNumber }

        <br/>
      </div>
    );
  }
}

MyHome.propTypes = {
  street: PropTypes.string.isRequired,
  houseNumber: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  const { user } = state

  return {
    street: user.attributes.address.street || 'straat',
    houseNumber: user.attributes.address.houseNumber || 'huisnummer',
  }
}

export default connect(mapStateToProps)(MyHome);
