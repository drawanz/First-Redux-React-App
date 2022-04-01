import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { thunkGetCurrencies } from '../actions/index';

class Wallet extends Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    return (
      <div>
        <Header />
        Wallet
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(thunkGetCurrencies()),
});

Wallet.propTypes = {
  getCurrencies: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Wallet);
