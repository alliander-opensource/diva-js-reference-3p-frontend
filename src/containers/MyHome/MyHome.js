import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';

const MyHome = ({ addresses, cities, session }) => (
  <div style={{ padding: '20px' }} id="my-home-page">
    <h2>My Home</h2>
    <br />
    <br />
    Address: { (addresses && addresses.length > 0) ? addresses[0] : 'Unknown address.'}<br />
    City: { (cities && cities.length > 0) ? cities[0] : 'Unknown city.'}<br />
    <br />
    <Row center="xs">
      <Col xs>
        {JSON.stringify(session)}
        <br />
      </Col>
    </Row>
  </div>
);

MyHome.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function mapStateToProps(state) {
  const { session } = state;
  return {
    addresses: session.attributes['irma-demo.MijnOverheid.address.street'],
    cities: session.attributes['irma-demo.MijnOverheid.address.city'],
    session,
  };
}

export default connect(mapStateToProps)(MyHome);
