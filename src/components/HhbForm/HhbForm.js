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
        <TextField
          id="initials"
          hintText="Voorletters"
          errorText={(error && formData.initials === '') ? errorText : ''}
          onChange={onChange}
          fullWidth
          value={formData.initials}
        />
        <TextField
          id="surname"
          hintText="Initialen en Achternaam"
          errorText={(error && formData.surname === '') ? errorText : ''}
          onChange={onChange}
          fullWidth
          value={formData.surname}
        />
        <TextField
          id="gender"
          hintText="Geslacht"
          errorText={(error && formData.gender === '') ? errorText : ''}
          onChange={onChange}
          fullWidth
          value={formData.gender}
        />
        <TextField
          id="birthdate"
          type="date"
          hintText="Geboortedatum"
          errorText={(error && formData.birthdate === '') ? errorText : ''}
          onChange={onChange}
          fullWidth
          value={formData.birthdate}
        />
        <TextField
          id="postcode"
          hintText="Postcode"
          errorText={(error && formData.postcode === '') ? errorText : ''}
          onChange={onChange}
          fullWidth
          value={formData.postcode}
        />
        <TextField
          id="city"
          hintText="Plaats"
          errorText={(error && formData.city === '') ? errorText : ''}
          onChange={onChange}
          fullWidth
          value={formData.city}
        />
        <TextField
          id="street"
          hintText="Straat"
          errorText={(error && formData.street === '') ? errorText : ''}
          onChange={onChange}
          fullWidth
          value={formData.street}
        />
        <TextField
          id="housenumber"
          hintText="Huisnummer"
          errorText={(error && formData.housenumber === '') ? errorText : ''}
          onChange={onChange}
          fullWidth
          value={formData.housenumber}
        />
        <TextField
          id="telefoon"
          hintText="Telefoonnummer"
          errorText={(error && formData.telefoon === '') ? errorText : ''}
          onChange={onChange}
          fullWidth
          value={formData.telefoon}
        />
        <TextField
          id="bsn"
          hintText="Burgersericenummer (BSN)"
          errorText={(error && formData.bsn === '') ? errorText : ''}
          onChange={onChange}
          fullWidth
          value={formData.bsn}
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
