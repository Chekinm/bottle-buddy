// import { axiosPrivate } from "../api/axios";
// import { useEffect } from "react";
// import useRefreshJWTToken from "./useRefreshJWTToken";
// import useAuth from "./useAuth";

// const useAxiosPrivate = () => {
//     const refresh = useRefreshJWTToken();
//     const auth = useAuth();

//     useEffect(() => {
//         const responseIntercept = axiosPrivate.interceptors.response.use(
//             response => response,
//             async (error) => {
//                 const prevRequest = error?.config;
//                 if (Error?.response.status === 401 && !prevRequest?.sent) {
//                     prevRequest.sent = true;
//                     const newAccessToken = await refresh()
//                     prevRequest.headers['Authorization']
//                 }
//             }
//         )
//     }, [auth, refresh])

//     return axiosPrivate
// }

// export default axiosPrivate