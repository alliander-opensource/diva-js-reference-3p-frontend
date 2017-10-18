import React, { Component } from 'react';
import Chip from 'material-ui/Chip';

// TODO move to config
const API_URL = '/api/get-session';

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionId: 'unknown',
      attributes: [],
    };
  }

  // TODO: decide if we need redux for this example
  componentDidMount() {
    fetch(API_URL, {
        credentials: 'include'
      })
      .then(response => {
        console.log(response);
        return response;
      })
      .then(response => response.json())
      .then(data => this.setState({
        sessionId: data.user.sessionId,
        attributes: data.user.attributes,
      }));
  }

  render() {
    const { sessionId, attributes } = this.state;

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
      </div>
    );
  }
}

export default UserInfo;
