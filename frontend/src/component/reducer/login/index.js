const initialState = {
    token: localStorage.getItem("token"),
    isLoggedIn: localStorage.getItem("token")?true:false
  };
  
  //create reducer function for login
  const loginReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "LOG_IN":
        return {
          token: payload,
          isLoggedIn: true,
        };
      case "LOG_OUT":
        return {
          token: null,
          isLoggedIn: false,
        };
        default: return state;
    }
    
  };
  
  //Create actions
  
  export const login = (token) => {
    return { type: "LOG_IN", payload: token };
  };
  
  export const logout = () => {
     
    return { type: "LOG_OUT" };
  };
  
  export default loginReducer;
  