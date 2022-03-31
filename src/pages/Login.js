import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState(() => ({
      [name]: value,
    }), () => this.validationCheck());
  }

  validationCheck = () => {
    const { email, password } = this.state;
    const minNumber = 6;
    if (email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
      && password.length >= minNumber) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  render() {
    const { buttonDisabled, password, email } = this.state;
    return (
      <main>
        <label htmlFor="email-input">
          email:
          <input
            id="email-input"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            type="email"
          />
        </label>

        <label htmlFor="password-input">
          senha:
          <input
            id="password-input"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            type="password"
          />
        </label>

        <button
          type="button"
          disabled={ buttonDisabled }
        >
          Entrar
        </button>
      </main>
    );
  }
}
