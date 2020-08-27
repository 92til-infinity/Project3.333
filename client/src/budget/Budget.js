import React from 'react';
import InputBudget from './InputBudget';
import InputExpenses from './InputExpenses'
import BudgetDisplay from '../display/BudgetDisplay';


const Budget = () => {
    return (
        <div className="row">
            <div className="col-lg-4">
                <h2>Budget Input</h2>
                <InputBudget />
                <h2>Expense Input</h2>
                <InputExpenses />

            </div>
            <div className="col-lg-8">
                <h2>Display Budget</h2>
                <BudgetDisplay />

            </div>
        </div>
    )
}

export default Budget