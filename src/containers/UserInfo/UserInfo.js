import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Chip from 'material-ui/Chip';

import { fetchSession } from '../../actions'

class UserInfo extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSession());
  }

  render() {
    const { sessionId, attributes, lastUpdated } = this.props;
    console.log(this.props);

    return (
      <div>
        <h2>User Info:</h2>
        {sessionId}

        <div style={{display: 'flex', flexWrap: 'wrap'}}>

          {attributes.map(attribute =>
            <Chip key={attribute} style={{margin: 10}}>
              {attribute}
            </Chip>
          )}

        </div>

        <br/><br/>

        {lastUpdated &&
        <span>
          Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
        </span>
        }
        <br/>
      </div>
    );
  }
}

UserInfo.propTypes = {
  sessionId: PropTypes.string.isRequired,
  attributes: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { user } = state

  return {
    sessionId: user.sessionId,
    attributes: user.attributes,
    isFetching: user.isFetching,
    lastUpdated: user.lastUpdated,
  }
}

export default connect(mapStateToProps)(UserInfo);
