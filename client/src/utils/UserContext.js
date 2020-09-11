import React from "react";

const UserContext = React.createContext({
  user: {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    date: "",
    token: "",
    todos: [],
    classes: [],
    activities: [],
    homework: [],
  },
  setUser: () => {},
});

// export const useUserContext = React.useContext(UserContext);
export default UserContext;
