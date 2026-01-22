// use protected route so that only login admin can navigate into admin dashboard
import { type ReactNode } from "react";
import { auth } from "../../firebaseconfig";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}: {children:ReactNode}) => {
    const user = auth.currentUser;
    if(!user){
        // if not logged in go back to the login page
        return <Navigate to="/admin/login" replace/>
    }

    //if logged in return to the requested page
    
    return<>{children}</>;
};

export default ProtectedRoute;