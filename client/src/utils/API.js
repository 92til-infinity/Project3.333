import axios from "axios";
import { RiEjectFill } from "react-icons/ri";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  addExpense: function (expenses) {
    return axios.post("/api/budgets", expenses);
  },

  getExpense: function () {
    return axios.get("/api/budgets");
  },

  deleteExpense: function (id) {
    console.log("delete")
    return axios.get("/api/budgets/" + id);

  },

  getUser: function (id) {
    return axios.get("/api/users/id/" + id);
  },

  getUsers: function (role) {
    return axios.get("/api/users/" + role);
  },

  getUnit: function (id) {
    return axios.get("/api/units/" + id);
  },

  getUnits: function () {
    return axios.get("/api/units");
  },

  assignHomework: function (id) {
    return axios.put("/api/users/homework/" + id);
  },

  setActivities: function (taskArray) {
    return axios.put("/api/users/activities", taskArray);
  },

  enrollClass: function (classId, userId) {
    return axios.put(`/api/units/enroll/${classId}/${userId}`);
  },

  enrollUser: function (classId, userId) {
    return axios.put(`/api/users/enroll/${classId}/${userId}`);
  },
};
