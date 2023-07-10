import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { Post as PostI} from "./main";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props{
    post: PostI;
    onDelete: (postId: string) => Promise<void>;
}

interface Like{
    userId:string;
    likeId:string;
}

export const Post = (props:Props)=>{

    const {post} = props;
    const [user] = useAuthState(auth);

    const likesRef = collection(db,"likes");
    const [likes,setLikes] = useState<Like[] | null>(null);

    const addLike = async ()=>{
        try{
            const newDoc = await addDoc(likesRef,{
                userId: user?.uid,
                postId: post.id
            });
    
            if(user){
                setLikes((prev)=>
                prev?[...prev,{userId:user?.uid, likeId:newDoc.id}] :
                [{userId:user?.uid, likeId:newDoc.id}]
                );
            }
        } catch(err){
            console.log(err);
        }
    };

    const removeLike = async ()=>{
        try{

            const likeToDeleteQuery = query(
                            likesRef,
                            where("postId","==",post.id),
                            where("userId","==",user?.uid)
                            );
            
            const likeToDeleteData = await getDocs(likeToDeleteQuery);

            const likeToDelete = doc(db,"likes",likeToDeleteData.docs[0].id)
            await deleteDoc(likeToDelete);
    
            if(user){
                setLikes((prev)=> prev && prev.filter((like)=>like.likeId!==likeToDeleteData.docs[0].id));
            }
        } catch(err){
            console.log(err);
        }
    };

    const likesDoc = query(likesRef,where("postId","==",post.id));

    const getLikes = async ()=>{
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=>(
            {userId:doc.data().userId , likeId: doc.id}
        )));
        
    };

    const deletePost = async () => {
        try {

          props.onDelete(post.id);
        } catch(err) {
            console.log(err);
        }
    }

    const hasUserLiked = likes?.find((like)=>like.userId===user?.uid);

    useEffect(()=>{
        getLikes();
    },[])

    return (
        <div className="postCard">
            <div className="title">{post.title}</div>
            <div className="content">{post.content}</div>
            <div className="iconBar">
                {`@${post.username}`}
                <button className="likeBtn" onClick={hasUserLiked?removeLike:addLike}> 
                    {hasUserLiked? <>&#128078;</> : <>&#128077;</>} 
                </button>
                <button className="deleteBtn" onClick={deletePost}>delete</button>
            </div >
            <div className="statusBar">
                <div>Likes: {likes?.length}</div>
                <div >{`posted on: ${post.date}`}</div>
            </div>
        </div>
    );
}