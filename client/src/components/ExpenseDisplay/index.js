import React, { Component } from 'react';
import { BudgetConsumer } from '../../utils/BudgetContext';
import API from '../../utils/API';

class ExpenseDisplay extends Component {

  state = {
    expenses: []
  }

  componentDidMount = () => {
    API.getExpense().then((expenses) => {
      console.log(expenses.data);
      setState({ expenses: expenses.data });
    });
  }

  handleSubmit = (dispatch) => {
    dispatch({
      type: 'remove',
      expenses: state.expenses,
    })
    setState({
      expenses: [
        ...state.expenses
      ]
    });
    console.log(state.expenses)
  };


  deleteExpense = (id) => {
    console.log(id)
    API.deleteExpense(id)

  };


  currentList = () => {
    const currentList =
      state.expenses.length > 0 ? (
        state.expenses.map((expense, index) => {
          const { dispatch } = state;
          return (
            <tr key={index}>
              <td>{expense.expenseTitle}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td >
                <span className="delete-btn" role="button" id={expense._id} tabIndex="0" onClick={(e) => { deleteExpense(expense._id) }} onSubmit={handleSubmit.bind(this, dispatch)}>
                  ✗
                </span>
              </td>
            </tr>
          );
        })
      ) : (
          <tr></tr>
        );
    return currentList;
  }


  render() {
    return (
      <div className='card mt-5' >
        <table className='table-bordered'>
          <thead>
            <tr>
              <th>title</th>
              <th>amount</th>
              <th>category</th>
              <th>remove</th>
            </tr>
          </thead>
          <BudgetConsumer>
            {(value) => {
              // console.log(value.expenses);
              const expensesList =
                value.expenses.length > 0 ? (
                  value.expenses.map((expense, index) => {
                    const { dispatch } = state;
                    return (
                      <tr key={index}>
                        <td>{expense.expenseTitle}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.category}</td>
                        <td onSubmit={handleSubmit.bind(this, dispatch)}>
                          <span className="delete-btn" role="button" id={expense._id} tabIndex="0" onClick={(e) => { deleteExpense(expense._id) }} onSubmit={handleSubmit.bind(this, dispatch)}>
                            ✗
                        </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                    <tr></tr>
                  );
              return <tbody>{currentList()}{expensesList}</tbody>;
            }}
          </BudgetConsumer>
          <tbody></tbody>
        </table>
      </div >
    );
  }
}

export default ExpenseDisplay;
