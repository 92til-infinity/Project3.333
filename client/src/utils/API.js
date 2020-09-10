import axios from "axios";
import { RiEjectFill } from "react-icons/ri";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  addExpense: function(expenses) {
    // console.log(expenses);
    return axios.post("/api/reactBudgets", expenses);
  },

  getUsers: function(role) {
    return axios.get("/api/users/" + role);
  },

  getUnits: function() {
    return axios.get("/api/units");
  },

  enroll: function(classId, userId) {
    return axios.put(`/api/units/enroll/${classId}/${userId}`);
  },
};
