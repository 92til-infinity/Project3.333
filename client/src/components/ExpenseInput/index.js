import React, { Component } from 'react';
import { BudgetConsumer } from '../../utils/BudgetContext';
import API from '../../utils/API';
import UserContext from "../../utils/UserContext";

class InputExpenses extends Component {
  static contextType = UserContext;

  state = {
    expenses: [],
    expenseTitle: '',
    amount: '',
    category: '',
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };


  handleSubmit = (dispatch, e) => {
    e.preventDefault();
    dispatch({
      type: 'expenses+',
      expenses: this.state.expenses,
    });
    dispatch({
      type: 'category+',
      category: this.state.category,
    });
    this.setState({
      [e.target.name]: e.target.value,
    });

  };

  addExpense = () => {
    if (this.state.expenses && this.state.category) {
      this.setState({
        expenses: [
          ...this.state.expenses,
          {
            expenseTitle: this.state.expenseTitle,
            amount: this.state.amount,
            category: this.state.category,
          },
        ],
      });
      API.addExpense({
        expenseTitle: this.state.expenseTitle,
        amount: this.state.amount,
        category: this.state.category,
      });
    }
    else {
      alert("please select a valid option for category...")
    }
  };
  render() {
    return (
      <BudgetConsumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className='card card-body'>
              <form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                <label>Expenses</label>
                <input
                  onChange={this.handleInput}
                  value={this.state.expenseTitle}
                  className='form-control'
                  name='expenseTitle'
                />
                <label>Amount</label>
                <input
                  onChange={this.handleInput}
                  value={this.state.amount}
                  className='form-control'
                  name='amount'
                />
                <label>Category</label>
                <select
                  onChange={this.handleInput}
                  value={this.state.category}
                  className='form-control'
                  name='category'
                >
                  <option value="" disabled>Please Select An Option Below...</option>
                  <option value='Food'>Food</option>
                  <option value='Fun'>Fun</option>
                  <option value='Rent'>Rent</option>
                  <option value='School'>School</option>
                  <option value='Transport'>Transport</option>
                </select>
                <button
                  onClick={this.addExpense}
                  className='btn btn-dark btn-block mt-3'
                >
                  Submit
                </button>
              </form>
            </div>
          );
        }}
      </BudgetConsumer>
      // <div className="card card-body">
      //     <form>
      //         <label>Expenses</label>
      //         <input className="form-control" name="expenseTitle" />
      //         <label>Amount</label>
      //         <input className="form-control" name="amount" />
      //         <button className="btn btn-dark btn-block mt-3">Submit</button>
      //     </form>

      // </div>
    );
  }
}

export default InputExpenses;
