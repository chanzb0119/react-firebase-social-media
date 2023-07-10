import {getDocs, collection, doc, deleteDoc } from "firebase/firestore"
import { auth, db } from "../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";
import { useAuthState } from "react-firebase-hooks/auth";

export interface Post{
    id: string;
    userId: string;
    title: string;
    username: string;
    content: string;
    date: string;
};

export const Main = ()=>{
    const [ user ] = useAuthState(auth);

    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db,"posts");

    const getPosts = async ()=>{
        const data = await getDocs(postsRef);
       setPostsList(data.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id
    })) as Post[]) ;
    };

    const handlePostDelete = async (postId: string) => {
        try {
            const postToDelete = postsList?.find((post)=>(post.id === postId));

            if(!postToDelete) return;

            if(user && postToDelete.userId !== user.uid) {
                alert("You are not allowed to delete other user's post!!!")
                return;
            }

            setPostsList((prevPostsList:any) =>
            prevPostsList?.filter((post:Post) => post.id !== postId)
            );

            const postDoc = doc(db, "posts", postId);
            await deleteDoc(postDoc);

        } catch (err) {
          console.log(err);
        }
      };

    useEffect(()=>{
        getPosts();
    },[]);

    return (
        <div className="postContainer">
            {postsList?.map((post)=>(
                <Post key={post.id} post={post} onDelete={handlePostDelete}/>
            ))}
        </div>

    );
}