import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class MyAccount extends Component {
  render() {
    const { emails } = this.props;

    return (
      <div style={{ padding: '20px' }} id="my-account-page">
        <h2>My Account</h2>

        <br/><br/>
        Email Address: { (emails && emails.length > 0) ? emails[0] : "No email address available."}
        <br/>
      </div>
    );
  }
}

MyAccount.propTypes = {
  emails: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  const { user } = state
  return {
    emails: user.attributes['irma-demo.idin.email.email'],
  }
}

export default connect(mapStateToProps)(MyAccount);
