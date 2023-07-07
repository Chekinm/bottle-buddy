import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshJWTToken from "./useRefreshJWTToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshJWTToken();
    const auth = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                return config
            },(error) => Promise.reject(error)
        )


        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    await refresh();
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate
}

export default useAxiosPrivate;