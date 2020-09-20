import React, { Component } from 'react';
import { BudgetConsumer } from '../../utils/BudgetContext';
import API from '../../utils/API';

class ExpenseDisplay extends Component {

  state = {
    expenses: [],
    _id: 0
  }

  componentDidMount() {
    API.getExpense().then((expenses) => {
      console.log(expenses.data);
      this.setState({ expenses: expenses.data });
    });
  }

  deleteExpense = (id, dispatch) => {
    API.deleteExpense(id)
      .then((data) => {
        console.log(data.data)
        this.setState({
          expenses: data.data,
        });
        dispatch({
          type: 'expenses+',
          expenses: this.state.expenses,
        });

      })
      .catch(err => console.log(err));
  };


  currentList = () => {
    const currentList =
      this.state.expenses.length > 0 ? (
        this.state.expenses.map((expense, index) => {
          const { dispatch } = this.state;
          return (
            <tr key={index}>
              <td>{expense.expenseTitle}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <span className="delete-btn" role="button" id={expense._id} tabIndex="0" onClick={(e) => { this.deleteExpense(e.currentTarget.id) }}>
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
      <div className='card mt-5'>
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
                    const { dispatch } = this.state;
                    return (
                      <tr key={index}>
                        <td>{expense.expenseTitle}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.category}</td>
                        <td>
                          <span className="delete-btn" role="button" id={expense._id} tabIndex="0" onClick={() => { this.deleteExpense(this.state._id) }}>
                            ✗
                        </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                    <tr></tr>
                  );
              return <tbody>{this.currentList()}{expensesList}</tbody>;
            }}
          </BudgetConsumer>
          <tbody></tbody>
        </table>
      </div>
    );
  }
}

export default ExpenseDisplay;
