import {
    useLocation,
    Navigate
  } from "react-router-dom";

export const RequireAuth = ({children}) => {
    const location = useLocation()

    if(true) {
        return <Navigate to="/login" state={{from: location}} replace />
    } else {
        return children
    }
}