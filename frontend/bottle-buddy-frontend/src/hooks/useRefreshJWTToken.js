import axios from "../api/axios";
import useAuth from "./useAuth";
const REFRESH_URL = "api/token/refresh/"

const useRefreshJWTToken = () => {
    const { setAuth }  = useAuth()
    
    const refresh = async () => {
        const response = await axios.post(REFRESH_URL)
        setAuth(prev => {
            console.log('prev stat from useRefresh', 'prev', JSON.stringify(prev));
            console.log('response from useRefresh', response.data)
            return response?.data 
        })
    } 
  return refresh
}

export default useRefreshJWTToken