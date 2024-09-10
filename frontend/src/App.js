import './App.css';
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';  // Handle redirection after login

// Use the environment variable for Client ID
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const navigate = useNavigate();  // React Router's useNavigate for redirection

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleClientId,  // Use the correct variable
        scope: ""  // Add necessary scopes if needed
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const handleLoginSuccess = (response) => {
    console.log("Login successful! User info:", response.profileObj);
    navigate("/dashboard");  // Redirect to dashboard on successful login
  };

  const handleLogoutSuccess = () => {
    console.log("Logout successful!");
    navigate("/");  // Redirect to homepage on logout
  };

  return (
    <div className="App">
      <h1>Login Page</h1>
      <LoginButton onLoginSuccess={handleLoginSuccess} />
      <LogoutButton onLogoutSuccess={handleLogoutSuccess} />
    </div>
  );
}

export default App;
