import { Children, createContext, useContext, useState } from "react";

const LoginContext = createContext();

function LoginProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;