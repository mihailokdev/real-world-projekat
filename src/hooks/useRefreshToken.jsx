import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/', {
            withCredentials: false
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.user.token);
            return { ...prev, token: response.data.user.token }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;