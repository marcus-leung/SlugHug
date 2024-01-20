import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import Logout from "./Logout";

const AuthenticationSection = () => {
    const { user, isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return <div>Welcome, {user.name}, <Logout/></div>;
    } else {
        // return <LoginButton />;
    }
};

export default AuthenticationSection;
