import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';

class HhbForm extends Component {
  render() {
    const { onChange, formData, error } = this.props;
    const errorText = 'Dit veld is vereist';
    return (
      <div style={{ padding: '20px' }} id="hhb-form">
        <TextField
          id="mail"
          hintText="E-mail"
          errorText={(error && formData.mail === '') ? errorText : ''}
          onChange={onChange}
          fullWidth
          value={formData.mail}
        />
      </div>
    );
  }
}

HhbForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
}

export default HhbForm;
