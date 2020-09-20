import React, { Component } from 'react';


const BudgetContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "budget+":
            return {
                ...state,
                budget: action.budget
            };
        case "expenses+":
            return {
                ...state,
                expenses: action.expenses
            };
        case "category+":
            return {
                ...state,
                category: action.category
            };
        case "remove":
            return {
                ...state,
                expenses: action.expenses.filter((expenses) => {
                    return expenses._id !== expenses._id;
                })
                // category: state.category.filter((category) => {
                //     return category._id !== category._id;
                // }),
            };
        default:
            return state
    }
}

class BudgetProvider extends Component {
    state = {
        budget: '',
        category: '',
        expenses: [

            // { title: 'Rent', amount: 500 },
            // { title: 'Food', amount: 150 },
            // { title: 'buy the crew a round', amount: 48 }
        ],
        dispatch: action => this.setState(state => reducer(state, action))
    }
    render() {
        return (
            <BudgetContext.Provider value={this.state}>
                {this.props.children}
            </BudgetContext.Provider>
        )
    }
}
const BudgetConsumer = BudgetContext.Consumer;

export { BudgetProvider, BudgetConsumer }