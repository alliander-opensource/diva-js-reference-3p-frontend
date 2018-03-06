import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid';

class MyHome extends Component {
  render() {
    const { addresses, cities } = this.props;

    return (
      <div style={{ padding: '20px' }} id="my-home-page">
        <h2>My Home</h2>

        <br/><br/>
        Address: { (addresses && addresses.length > 0) ? addresses[0] : "Unknown address."}<br />
        City: { (cities && cities.length > 0) ? cities[0] : "Unknown city."}<br />
        <br/>
        <Row center="xs">
          <Col xs>
            <img src="/api/images/address.jpg" alt="Your house on the map" />
            <br/>
          </Col>
        </Row>
      </div>
    );
  }
}

MyHome.propTypes = {
  addresses: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  const { user } = state
  return {
    addresses: user.attributes['irma-demo.idin.idin.address'],
    cities: user.attributes['irma-demo.idin.idin.city'],
  }
}

export default connect(mapStateToProps)(MyHome);
