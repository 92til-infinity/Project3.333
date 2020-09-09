import React from 'react';
import Budget from '../Budget';
import { BudgetProvider } from '../../utils/BudgetContext';

function BudgetPage() {
  return (
    <div className='App'>
      <BudgetProvider>
        <div className='container my-5'>
          <Budget />
        </div>
      </BudgetProvider>
    </div>
  );
}

export default BudgetPage;
