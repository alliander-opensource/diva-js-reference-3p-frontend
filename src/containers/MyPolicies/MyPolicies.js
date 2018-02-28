import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid';
import Moment from 'react-moment';
import 'moment/locale/nl';

import RaisedButton from 'material-ui/RaisedButton';

import { getPolicies, deletePolicy } from '../../actions';

class MyPolicies extends Component {
  componentDidMount() {
    this.props.getPolicies();
  }

  render() {
    const { policies } = this.props;

    const policyContainerStyle = {padding: '10px', backgroundColor: '#b3f0ff', marginBottom: '10px'};
    // const emphasisStyle = { textTransform: 'uppercase', color: 'green' };
    // const emphasisStyle2 = { textTransform: 'uppercase', color: 'red' };

    return (
      <div style={{ padding: '20px' }} id="my-policies-page">
        <Row>
          <Col xs={8}>
            <h2>Mijn Toestemmingen</h2>
          </Col>
          <Col xs={4} style={{ textAlign: 'right' }}>
            <RaisedButton label="Toevoegen" primary={true} style={{}}/>
          </Col>
        </Row>

        { policies.isFetching ? "SPINNER" : (
          <div>
          {
            policies.policies.map(policy =>
              <div key={ policy.id } style={policyContainerStyle}>
                <Row>
                  <Col xs={12}> { policy.id } </Col>
                </Row>
                <Row>
                  <Col xs={1} sm={2} md={2} lg={2}> { policy.service_provider } </Col>
                  <Col xs={11} sm={10} md={10} lg={10}> { policy.message }</Col>
                </Row>
                <br/>
                {/*}<Row>
                  <Col xs={12}>
                    <span style={emphasisStyle}>{ policy.policy.actor }</span>&nbsp;
                    mag&nbsp;
                    <span style={emphasisStyle}>{ policy.policy.actee }</span>&nbsp;
                    <span style={emphasisStyle2}>{ policy.policy.action }</span>&nbsp;
                  </Col>
                  <Col xs={12}>
                    <span style={emphasisStyle}>{ policy.policy.goal }</span>&nbsp;
                  </Col>
                  {
                    policy.policy.conditions.map(condition =>
                      <Col xs={12}>
                        <span style={emphasisStyle}>{ policy.policy.goal }</span>&nbsp;
                      </Col>
                    )
                  }
                </Row>*/}
                <Row>
                  <Col xs={8}>
                    <Moment locale="nl" format="D MMM YYYY HH:mm" date={ policy.created_at } />
                  </Col>
                  <Col xs={4} style={{ textAlign: 'right' }}>
                    <RaisedButton onClick={() => this.props.deletePolicy(policy.id)} label="Intrekken" primary={true} disabled={ policy.isDeleting } style={{}}/>
                  </Col>
                </Row>
              </div>
            )
          }
          </div>
        )}

        <br/><br/>

      </div>
    );
  }
}

MyPolicies.propTypes = {
  addresses: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  const { user, policies } = state
  return {
    addresses: user.attributes['pbdf.pbdf.idin.address'],
    cities: user.attributes['pbdf.pbdf.idin.city'],
    policies: policies,
  }
}

const mapDispatchToProps = {
  getPolicies,
  deletePolicy,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPolicies);
