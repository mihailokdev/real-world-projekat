import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();


  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
          setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`aT: ${JSON.stringify(auth?.token)}`)
  },[isLoading])

  return (
      <>
        {isLoading
            ? <p>Loading...</p>
            : <Outlet />}
      </>
  )
};

export default PersistLogin; 
