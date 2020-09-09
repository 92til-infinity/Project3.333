import React from 'react';
import BudgetInput from '../BudgetInput';
import ExpenseInput from '../ExpenseInput';
import BudgetDisplay from '../BudgetDisplay';
// mix of Extend Component and Redux throughout, made more sense for me when building and in general
// --Scott

const Budget = () => {
  return (
    <div className='row'>
      <div className='col-lg-4'>
        <h2>Budget Input</h2>
        <BudgetInput />
        <h2>Expense Input</h2>
        <ExpenseInput />
      </div>
      <div className='col-lg-8'>
        <h2>Display Budget</h2>
        <BudgetDisplay />
      </div>
    </div>
  );
};

export default Budget;
