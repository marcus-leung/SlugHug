import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "./Logout";
import LoginButton from "./LoginButton";
// Asynchronous function to find a user by their name and create the user if not found
async function findOrCreateUser(userName) {
    try {
        // Sending a GET request to the backend to find the user by userName
        const response = await fetch(`http://localhost:5000/users/find-by-name?userName=${encodeURIComponent(userName)}`);

        // If the response is OK and the user is found
        if (response.ok) {
            const user = await response.json();
            console.log('User found:', user);
            return user;
        } else if (response.status === 404) {  // If the user is not found (assuming backend returns 404)
            console.log('User not found, creating user...');
            console.log("user", userName)
            let myObj = {
                userName: userName,
                userType: "regular"
            }
            createUser(myObj)
        } else {
            // If there are other types of errors, throw an error
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        // Log any errors to the console
        console.error('Error during user search or creation:', error);
        return null; // Return null or implement other error handling as needed
    }
}

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
            findOrCreateUser(user.name);
        }

    }, [user, isAuthenticated]);
};

export default AuthenticationSection;