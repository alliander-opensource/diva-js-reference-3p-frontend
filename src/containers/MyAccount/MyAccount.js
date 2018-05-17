import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MyAccount = ({ emails }) => (
  <div style={{ padding: '20px' }} id="my-account-page">
    <h2>My Account</h2>
    <br />
    <br />
    Email Address: { (emails && emails.length > 0) ? emails[0] : 'No email address available.'}
    <br />
  </div>
);

MyAccount.propTypes = {
  emails: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function mapStateToProps(state) {
  const { session } = state;
  return {
    emails: session.attributes['pbdf.pbdf.email.email'],
  };
}

export default connect(mapStateToProps)(MyAccount);
