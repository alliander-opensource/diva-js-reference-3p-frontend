import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RequestAttributeDisclosure from '../containers/RequestAttributeDisclosure/RequestAttributeDisclosure';

/**
 * HOC that Handles whether or not the user is allowed to see the page.
 * @param {string} requiredAttribute - user attribute that is required to see the page.
 * @param {string} attributeLabel - label for this attribute
 * @returns {Component}
 */
export default function WithDivaAuthorization(content) {
  return WrappedComponent => {
    class WithAuthorization extends Component {
      static propTypes = {
        user: PropTypes.object,
      };

      hasRequiredAttributes = (existing, content) => {
        const existingAttributes = Object.keys(existing);
        return content.reduce((accumulator, attributeGroup) => {
          return accumulator && attributeGroup.attributes.some(el => existingAttributes.includes(el));
        }, true);
      }

      render() {
        const { user } = this.props;
        if (this.hasRequiredAttributes(user.attributes, content)) {
          return <WrappedComponent {...this.props} />;
        } else {
          return <RequestAttributeDisclosure requiredAttributes={content}/>;
        }
      };
    };
    return connect(state => {
      return { user: state.user };
    })(WithAuthorization);
  };
};
