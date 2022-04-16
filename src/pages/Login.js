import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { emailAction } from '../actions/index';
import styles from './Login.module.css';

class Login extends Component {
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
    if (email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) // https://regexr.com/3e48o
      && password.length >= minNumber) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  handleClick = () => {
    const { click, history } = this.props;
    const { email } = this.state;
    click(email);
    this.setState = ({
      email: '',
      password: '',
      buttonDisabled: true,
    }, history.push('/carteira'));
  }

  render() {
    const { buttonDisabled, password, email } = this.state;
    return (
      <main className={ styles.Login__container }>
        <form>
          <h1>Sign in</h1>
          <label htmlFor="email-input">
            <input
              data-testid="email-input"
              id="email-input"
              name="email"
              onChange={ this.handleChange }
              placeholder="Email"
              value={ email }
              type="email"
            />
          </label>

          <label htmlFor="password-input">
            <input
              data-testid="password-input"
              id="password-input"
              name="password"
              onChange={ this.handleChange }
              placeholder="Senha"
              value={ password }
              type="password"
            />
          </label>

          <button
            type="button"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  click: (email) => {
    dispatch(emailAction(email));
  },
});

Login.propTypes = {
  click: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
