import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
    const { user, isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return <div>Not logged in</div>;
    }

    return (
        <div>
            <h2>{user.name}</h2>
        </div>
    );
};

export default UserProfile;
