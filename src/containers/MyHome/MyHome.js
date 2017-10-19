import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class MyHome extends Component {
  render() {
    const { address } = this.props;

    return (
      <div>
        <h2>My Home</h2>

        <br/><br/>
        Address: { address.attributeValue }

        <br/>
      </div>
    );
  }
}

MyHome.propTypes = {
  address: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { user } = state

  const addresses = user.attributes.filter(attribute => {
    return attribute.attributeName === 'pbdf.pbdf.idin.address';
  })
  console.log(addresses);

  return {
    address: addresses[0] || 'Address Unknown',
  }
}

export default connect(mapStateToProps)(MyHome);
