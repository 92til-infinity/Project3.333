import React, { Component } from 'react';
import { BudgetConsumer } from '../../utils/BudgetContext';
import API from '../../utils/API';

class ExpenseDisplay extends Component {

  state = {
    expenses: []
  }

  componentDidMount() {
    console.log(this.state.expenses)
    API.getExpense().then((expenses) => {
      console.log(expenses.data);
      this.setState({ expenses: expenses.data });
    });
  }

  // call delete for the API then rerun the get expense API to reset the state
  deleteExpense = (id) => {
    API.deleteExpense(id).then(

      API.getExpense().then((expenses) => {
        console.log(expenses.data);
        this.setState({ expenses: expenses.data });
      })
    )
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
              <td >
                <span>
                  {/* <button onClick={this.refreshPage}>✗</button> */}
                  <button id={expense._id} tabIndex="0" onClick={(e) => { this.deleteExpense(e.currentTarget.id) }}>✗</button>
                </span>
              </td>
            </tr >
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
              const { dispatch } = this.state;
              const expensesList =
                value.expenses.length > 0 ? (
                  value.expenses.map((expense, index) => {
                    return (
                      <tr key={index}>
                        <td>{expense.expenseTitle}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.category}</td>
                        <td>
                          <span>
                            {/* <button onClick={this.refreshPage}>✗</button> */}
                            <button id={expense._id} tabIndex="0" onClick={(e) => { this.deleteExpense(e.currentTarget.id) }}>✗</button>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                    <tr></tr>
                  );
              return <tbody >{this.currentList()}{expensesList}</tbody>
            }}
          </BudgetConsumer>
        </table>
      </div >
    );
  }
}

export default ExpenseDisplay;
