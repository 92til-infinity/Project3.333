import React, { Component } from 'react';
import { BudgetConsumer } from '../../utils/BudgetContext';
import API from '../../utils/API';
class ExpenseDisplay extends Component {

  state = {
    expenses: []
  }

  componentDidMount() {
    API.getExpense().then((expenses) => {
      console.log(expenses.data);
      this.setState({ expenses: expenses.data });


    });
  };
  currentList = () => {
    const currentList =
      this.state.expenses.length > 0 ? (
        this.state.expenses.map((expense, index) => {
          return (
            <tr key={index}>
              <td>{expense.expenseTitle}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
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
            </tr>
          </thead>
          <BudgetConsumer>
            {(value) => {
              // console.log(value.expenses);
              const expensesList =
                value.expenses.length > 0 ? (
                  value.expenses.map((expense, index) => {
                    return (
                      <tr key={index}>
                        <td>{expense.expenseTitle}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.category}</td>
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
