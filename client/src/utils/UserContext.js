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

// In Dashboard Page, import UserContext from "...."
// Set a state as: const [userState, setUserState] = useState({});
// onEffect get user with GET "api/users/:id" or GET "api/auth" setUserState to results
// in dashboard render, wrap everything in <UserContext.Provider value={userState}>
