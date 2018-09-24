import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MyHome extends Component {
  componentWillMount() {
    const { disclosureResult } = this.props;
    const signature = disclosureResult.signature;
    if (signature !== undefined && signature.jwt !== undefined) {
      window.location.href = `http://fieldlab.westeurope.cloudapp.azure.com:3030/ebase/akte.eb?irma_token=${signature.jwt}`;
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
  disclosureResult: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  const { divaReducer } = state;
  return {
    disclosureResult: divaReducer.sessions['my-home-disclose'],
  };
}

export default connect(mapStateToProps)(MyHome);
