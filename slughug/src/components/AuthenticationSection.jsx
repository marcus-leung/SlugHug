import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "./Logout";
import LoginButton from "./LoginButton";

async function createUser(data) {
    try {
        const response = await fetch('http://localhost:5000/users/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const result = await response.json();
        console.log("Success:", result)
    } catch (err) {
        console.error(err)
    }
}

const AuthenticationSection = () => {
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        console.log("useEffect triggered", { isAuthenticated, user });
        if(isAuthenticated){
            console.log("user", user.name)
            let myObj = {
                userName: user.name,
                userType: "regular"
            }
            createUser(myObj)
        }

    }, [user, isAuthenticated]);


    if (isAuthenticated) {
        return <div>Welcome, {user.name} <Logout /></div>;
    } else {
        return <LoginButton />;
    }
};

export default AuthenticationSection;
