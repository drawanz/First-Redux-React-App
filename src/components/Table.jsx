import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionRemoveExpense } from '../actions/index';
import styles from './Table.module.css';

class Table extends Component {
  render() {
    const { expenses, deleteExpense, handleEditExpense } = this.props;
    return (
      <div className={ styles.Container__Table }>
        <h1>Despesas</h1>
        <table className={ styles.Table }>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {expenses.length > 0 && expenses.map(
            ({
              id,
              value,
              description,
              currency,
              method,
              tag,
              exchangeRates,
            }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name.split('/')[0]}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    className={ styles.Button__edit }
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => handleEditExpense(id) }
                  >
                    Editar
                  </button>
                  <button
                    className={ styles.Button__delete }
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => deleteExpense(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ),
          )}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(actionRemoveExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.object,
  deleteExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
