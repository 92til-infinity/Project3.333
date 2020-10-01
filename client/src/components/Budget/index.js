import React from 'react';
import InputBudget from '../BudgetInput';
import InputExpenses from '../ExpenseInput';
import BudgetDisplay from '../BudgetDisplay';
import ExpenseDisplay from '../ExpenseDisplay';
// import AtlasDisplay from '../AtlasDisplay';
// mix of Extend Component and Redux throughout, made more sense for me when building and in general
// --Scott

const Budget = () => {
  return (
    <div className='container'>
      {/* <AtlasDisplay /> */}
      <div className='row'>
        <div className='col-lg-4'>
          <h2>New Budget</h2>
          <InputBudget />
          <h2>New Expense</h2>
          <InputExpenses />
        </div>
        <div className='col-lg-8'>
          <h2>Budget</h2>
          <BudgetDisplay />
          <h2>Expenses</h2>
          <ExpenseDisplay />
        </div>
      </div>
    </div>
  );
};

export default Budget;
