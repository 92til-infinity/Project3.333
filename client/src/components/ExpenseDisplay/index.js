import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { BudgetConsumer } from '../../utils/BudgetContext';
import API from '../../utils/API';
class ExpenseDisplay extends Component {
  state = {
    expenses: [],
  };

  componentDidMount() {
    API.getExpense().then((expenses) => {
      console.log(expenses.data);
      this.setState({ expenses: expenses.data });
    });
  }
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
  };

  render() {
    return (
      <div>
        <MDBTable>
          <MDBTableHead color='primary-color' textWhite>
            <tr style={{ backgroundColor: '#4285f4' }}>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </MDBTableHead>
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
              return (
                <MDBTableBody>
                  {this.currentList()}
                  {expensesList}
                </MDBTableBody>
              );
            }}
          </BudgetConsumer>
          <MDBTableBody></MDBTableBody>
        </MDBTable>
      </div>
    );
  }
}

export default ExpenseDisplay;
