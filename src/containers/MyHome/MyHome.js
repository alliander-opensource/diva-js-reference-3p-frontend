import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'qs';

function constructRedirectUri(urlParams, irmaToken) {
  const parsedParams = qs.parse(urlParams.replace('?', ''));
  return `${parsedParams.ufsReturnURL}?irmaToken=${irmaToken}`;
}

class MyHome extends Component {
  componentWillMount() {
    const { disclosureResult, location } = this.props;
    const signature = (disclosureResult !== undefined) ? disclosureResult.signature : undefined;
    if (signature !== undefined && signature.jwt !== undefined) {
      const redirectUri = constructRedirectUri(location.search, signature.jwt);
      window.location.href = redirectUri;
    }
  }

  render() {
    return (
      <div style={{ padding: '20px' }} id="my-home-page">
        Je wordt doorgestuurd...
      </div>
    );
  }
}

MyHome.propTypes = {
  disclosureResult: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

function mapStateToProps(state) {
  const { divaReducer } = state;
  return {
    disclosureResult: divaReducer.sessions['my-home-disclose'],
  };
}

export default withRouter(connect(mapStateToProps)(MyHome));
