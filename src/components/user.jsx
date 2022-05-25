import React, { useEffect, useState } from 'react'
import axios from '../api/axios';

function User() {

    const [ user, setUser ] = useState();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUser = async () => {
            try {
                const response = await axios.get('/user', {
                    signal: controller.signal
                })
                console.log(response.data)
                isMounted && setUser(response.data.user.username);
            } catch(err) {
                console.log(err)
            }
        }

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
    },[])

  return (
    <div>
        <h2> Active User </h2>
        <div> {user} </div>
    </div>
  )
}

export default User;