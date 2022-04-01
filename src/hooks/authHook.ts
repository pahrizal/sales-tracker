import { signInWithPopup, User } from "firebase/auth";
import React from "react";
import { firebaseAuth, googleAuthProvider } from "../modules/firebase";

/**
 * This hook is used to handle authentication with firebase
 * @returns {[boolean, () => void]}
 */
export default function useAuth() {
    const [user, setUser] = React.useState<User | null>(null);
    const [authenticating, setAuthenticating] = React.useState(false);
    const [authenticated, setAuthenticated] = React.useState(false);
    const logout = React.useCallback(() => {
        setAuthenticating(true);
        firebaseAuth.signOut().then(() => {
            setAuthenticating(false);
            setAuthenticated(false);
            setUser(null);
            // remove the user from local storage to log user out
            localStorage.removeItem("user");
        });
    }, []);
    const authenticate = React.useCallback(() => {
        setAuthenticating(true);
        signInWithPopup(firebaseAuth, googleAuthProvider)
            .then((result) => {
                const user = result.user;
                setUser(result.user);
                setAuthenticated(true);
                setAuthenticating(false);
                // save user data to local storage
                localStorage.setItem("user", JSON.stringify(user));
            })
            .catch((error) => {
                setAuthenticating(false);
                console.error(error);
            });
    }, []);

    // grab from local storage if user has check the Remember me
    React.useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
            setAuthenticated(true);
        }
    }, []);

    return { authenticate, authenticating, authenticated, user, logout };
}
