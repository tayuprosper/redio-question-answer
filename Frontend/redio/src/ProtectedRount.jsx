import { Navigate } from "react-router-dom";
import { getAccessToken } from "./AuthService/AuthService";
function ProtectedRoute({ children }) {
    const accesstoken = getAccessToken()
    return (
            accesstoken ? children : <Navigate to="/login"/>
    )
   
}

export default ProtectedRoute;