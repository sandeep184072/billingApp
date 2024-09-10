import { GoogleLogin } from 'react-google-login';

const clientId = "893018843218-14ivoodb6ec29j4ams1jqecjccg05gen.apps.googleusercontent.com";

function Login({ onLoginSuccess }) {
    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user:", res.profileObj);
        onLoginSuccess(res);  // Call the parent function to handle the login success
    };

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    };

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}

export default Login;
