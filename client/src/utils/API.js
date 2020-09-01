import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
    addExpense: function (expenses) {
        console.log(expenses);
        return axios.post("/api/reactBudgets", expenses);

    },
    // addTodoListItem: function (todoList) {
    //     console.log(todoList);
    //     return axios.post("/api/reactBudgets", todoList);

    // }

};
