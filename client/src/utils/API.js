import axios from "axios";
import { RiEjectFill } from "react-icons/ri";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  addExpense: function(expenses) {
    return axios.post("/api/budgets", expenses);
  },

  getUser: function(id) {
    return axios.get("/api/users/id/" + id);
  },

  getUsers: function(role) {
    return axios.get("/api/users/" + role);
  },

  getUnit: function(id) {
    return axios.get("/api/units/" + id);
  },

  getUnits: function() {
    return axios.get("/api/units");
  },

  getUnitsBetween: function(date) {
    return axios.get("/api/units/between", date);
  },

  enrollClass: function(classId, userId) {
    return axios.put(`/api/units/enroll/${classId}/${userId}`);
  },

  enrollUser: function(classId, userId) {
    return axios.put(`/api/users/enroll/${classId}/${userId}`);
  },
};
