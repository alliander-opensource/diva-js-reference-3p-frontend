import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RequestAttributeDisclosure from '../containers/RequestAttributeDisclosure/RequestAttributeDisclosure';

/**
 * HOC that Handles whether or not the user is allowed to see the page.
 * @param {array} requiredAttribute - user attribute that is required to see the page.
 * @returns {Component}
 */
export default function WithDivaAuthorization(requiredAttribute) {
  return WrappedComponent => {
    class WithAuthorization extends Component {
      static propTypes = {
        user: PropTypes.object,
      };
      render() {
        const { user } = this.props;
        const attributesOfRequiredType = user.attributes.filter(attribute => {
          return attribute.attributeName === requiredAttribute;
        });
        if (attributesOfRequiredType.length > 0) {
          return <WrappedComponent {...this.props} />;
        } else {
          return <RequestAttributeDisclosure requiredAttribute={requiredAttribute}/>;
        }
      };
    };
    return connect(state => {
      return { user: state.user };
    })(WithAuthorization);
  };
};
