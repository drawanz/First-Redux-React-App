import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const total = expenses.length > 0 ? (
      expenses.map(({ value, currency, exchangeRates }) => Number(value) * Number(exchangeRates[currency].ask))
        .reduce((acc, valueAct) => acc + valueAct)
    ) : 0;

    return (
      <header>
        <div>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ total.toFixed(2) }</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
