import {auth,provider} from "../config/firebase";
import {signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";


export const Login = ()=>{
    const navigate = useNavigate();

    const signInWithGoogle = async ()=>{
        const result = await signInWithPopup(auth,provider);
        navigate("/");
    };

    return (
        <div>
            <h1>Login</h1>
            <p>Sign in with Google to continue...</p>
            <button className="signInBtn"  onClick={signInWithGoogle}>Sign in with Google</button>
        </div>

    );
}