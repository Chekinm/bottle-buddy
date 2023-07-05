import axios from "../api/axios";
import useAuth from "./useAuth";
const BLACKLIST_URL = "api/token/blacklist/"

const useBlackListJWTCookies = () => {
    const {setAuth }  = useAuth()
    
    const blackList = async () => {
        const response = await axios.post(BLACKLIST_URL)
        setAuth(prev => {
            
            return {"first_name":"Anonimus","last_name":"","user_id":"","email":""}
        })
    } 
  return blackList
}

export default useBlackListJWTCookies
