import React from 'react';
import InputBudget from './InputBudget';
import InputExpenses from './InputExpenses'
import BudgetDisplay from '../display/BudgetDisplay';
import AtlasDisplay from '../display/AtlasDisplay'
// mix of Extend Component and Redux throughout, made more sense for me when building and in general
// --Scott

const Budget = () => {

    return (
        <div className="container">
            <AtlasDisplay />
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
        </div>
    )
}

export default Budget;