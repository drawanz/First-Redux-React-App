import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from './Table';
import { thunkGetCurrencies,
  thunkGetExchange,
  actionEditExpense,
} from '../actions/index';
import styles from './Form.module.css';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      editing: false,
      idToEdit: '',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleEditExpense = (id) => {
    this.setState({ editing: true, idToEdit: id });
  }

  handleClickEdit = () => {
    const { startEdit, expenses } = this.props;
    const { idToEdit, value, description, currency, method, tag } = this.state;
    const id = idToEdit;
    const { exchangeRates } = expenses[id];
    console.log(exchangeRates);
    startEdit({ id, value, description, currency, method, tag, exchangeRates });
    this.setState({ value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      editing: false,
    });
  }

  handleChange = ({ target }) => {
    console.log('chamou handle');
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(() => ({
      [name]: value,
    }));
  }

  handleClick = () => {
    const { pushExpenses } = this.props;
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    const { id, value, description, currency, method, tag } = this.state;
    pushExpenses({ id, value, description, currency, method, tag });
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag, editing } = this.state;

    return (
      <div className={ styles.Form__container }>
        <form>
          <label htmlFor="description-input">
            Descrição:
            <input
              id="description-input"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              type="text"
            />
          </label>

          <label htmlFor="email-input">
            Despesa:
            <input
              id="value-input"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              type="number"
            />
          </label>

          <label htmlFor="currency-input">
            Moeda:
            <select
              id="currency-input"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((item) => (
                <option key={ item } value={ item }>
                  { item }
                </option>))}
            </select>
          </label>

          <label htmlFor="method-input">
            Método de pagamento:
            <select
              id="method-input"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            Categoria:
            <select
              id="tag-input"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          {editing ? (
            <button
              type="button"
              onClick={ this.handleClickEdit }
            >
              Editar despesa
            </button>)
            : (
              <button
                type="button"
                onClick={ this.handleClick }
              >
                Adicionar despesa
              </button>
            )}
        </form>
        <Table handleEditExpense={ this.handleEditExpense } />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(thunkGetCurrencies()),
  pushExpenses: (expense) => dispatch(thunkGetExchange(expense)),
  startEdit: (objToEdit) => dispatch(actionEditExpense(objToEdit)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Form.propTypes = {
  getCurrencies: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
