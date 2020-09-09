import React from 'react';
import { BudgetConsumer } from '../store';


const BalanceDisplay = () => {
    return (
        <BudgetConsumer>
            {value => {
                const totalExpense = value.expenses.length > 0 ? (
                    value.expenses.reduce((acc, curr) => {
                        acc += parseInt(curr.amount)
                        return acc
                    }, 0)) : 0;
                // totalExpense takes the current amount from your expenses.amount from state and adds to the new input as an object. need parse int to make it an integer

                return (
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">budget</div>
                                <div className="card-body">
                                    <h5 className="text-center card-title">{value.budget}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">expense</div>
                                <div className="card-body">
                                    <h5 className="text-center card-title">{totalExpense}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">balance</div>
                                <div className="card-body">
                                    <h5 className="text-center card-title">{value.budget - totalExpense}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }}
        </BudgetConsumer>
    )
}

export default BalanceDisplay