import React from "react";

const UserContext = React.createContext({
  _id: "",
  firstname: "",
  lastname: "",
  email: "",
  role: "",
  classes: [],
  activities: [],
  homework: [],
});

export default UserContext;
