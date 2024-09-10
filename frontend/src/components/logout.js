import { GoogleLogout } from "react-google-login";

const clientId = "893018843218-14ivoodb6ec29j4ams1jqecjccg05gen.apps.googleusercontent.com";

function Logout({ onLogoutSuccess }) {
    const onSuccess = () => {
        console.log("Log out Successful!");
        onLogoutSuccess();  // Call the parent function to handle logout success
    };

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default Logout;
