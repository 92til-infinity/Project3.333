import React from 'react';
import BalanceDisplay from './BalanceDisplay';
import ExpenseDisplay from './ExpenseDisplay';

const BudgetDisplay = () => {
    return (
        <div className="card card-body">
            <h3 className="text-center">Budget info</h3>
            <h3>Balance</h3>
            <BalanceDisplay />
            <h3>Expenses</h3>
            <ExpenseDisplay />
        </div>
    )
}

export default BudgetDisplay