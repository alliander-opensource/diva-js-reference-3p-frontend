import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class MyHome extends Component {
  render() {
    const { addresses } = this.props;

    return (
      <div>
        <h2>My Home</h2>

        <br/><br/>
        Address: { (addresses && addresses.length > 0) ? addresses[0] : "Unknown address."}
        <br/>
      </div>
    );
  }
}

MyHome.propTypes = {
  addresses: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { user } = state
  return {
    addresses: user.attributes['pbdf.pbdf.idin.address'],
  }
}

export default connect(mapStateToProps)(MyHome);
