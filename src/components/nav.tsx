import { Link } from "react-router-dom";
import {auth} from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";

export const Nav = ()=>{

    const [ user ] = useAuthState(auth);

    const signUserOut =  async ()=>{
        signOut(auth);
    };

    return (
        <div className="navBar">
            <Link to="/" className="linkers"> Home</Link>
            {!user?<Link to="/login" className="linkers">Login</Link> :
            <Link to="/createpost" className="linkers">Create Post</Link>}
            {user && (
                <div className="userBar">
                    <div className="userName">{user?.displayName}</div>
                    <img  className="icon" src={user?.photoURL || ""} width="50" height="50"/>
                    <button className="logOutBtn" onClick={signUserOut}>Log out</button>
                </div>
            )}
        </div>
    );

}