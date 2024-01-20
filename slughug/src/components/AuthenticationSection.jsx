import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const AuthenticationSection = () => {
    const { user, isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return <div>Welcome, {user.name}, <LogoutButton/></div>;
    } else {
        return <LoginButton />;
    }
};

export default AuthenticationSection;
