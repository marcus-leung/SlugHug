import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react'; // Import Auth0Provider from @auth0/auth0-react

// Get the DOM element with the ID 'root' and create a root render node
const container = document.getElementById('root');
const root = createRoot(container); // Create root with createRoot, no need to use ReactDOM again

// Render the Auth0Provider and App component into the root node using root.render
root.render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-yuanbopang.us.auth0.com"
            clientId="Q48AXNPiXkzfczkJvDAIMpUQKW9CYq6w"
            authorizationParams={{
                redirect_uri: "http://localhost:3000" // 设置重定向的URL为localhost:3000
            }}
        >
            <App />
        </Auth0Provider>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
