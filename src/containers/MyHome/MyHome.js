import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MyHome = ({ addresses, cities }) => (
  <div style={{ padding: '20px' }} id="my-home-page">
    <h2>My Home</h2>
    <br />
    <br />
    Address: { (addresses && addresses.length > 0) ? addresses[0] : 'Unknown address.'}<br />
    City: { (cities && cities.length > 0) ? cities[0] : 'Unknown city.'}<br />
    <br />
  </div>
);

MyHome.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function mapStateToProps(state) {
  const { divaReducer } = state;
  return {
    addresses: divaReducer.attributes
      .filter(el => el.id === 'irma-demo.MijnOverheid.address.street')
      .map(el => el.rawvalue),
    cities: divaReducer.attributes
      .filter(el => el.id === 'irma-demo.MijnOverheid.address.city')
      .map(el => el.rawvalue),
  };
}

export default connect(mapStateToProps)(MyHome);
