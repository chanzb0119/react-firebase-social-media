import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc,  collection} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";

interface CreateFormData {
    title:string;
    content:string;
};

export const CreateForm = ()=>{


    const [ user ] = useAuthState(auth);

    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("Please enter a title"),
        content: yup.string().required("Please enter something")
    });

    const { register, handleSubmit , formState:{errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postsRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFormData)=>{

        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(currentDate.getDate()).padStart(2, '0'); 
        const hours = String(currentDate.getHours()).padStart(2, '0'); 
        const minutes = String(currentDate.getMinutes()).padStart(2, '0'); 
        const seconds = String(currentDate.getSeconds()).padStart(2, '0'); 

        const dateString = `${year}-${month}-${day}`;
        const timeString = `${hours}:${minutes}:${seconds}`;

        const dateTimeString = `${dateString} ${timeString}`;

        await addDoc(postsRef,{
            title: data.title,
            content: data.content,
            username: user?.displayName,
            userId: user?.uid,
            date:dateTimeString
        });

        navigate("/");
    };

    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit(onCreatePost)}>
                <input className="title" placeholder="title..." {...register("title")}/>
                <p>{errors.title?.message}</p>
                <textarea className="content" placeholder="content..." {...register("content")}/>
                <p>{errors.content?.message}</p>
                <input className="submitBtn" type="submit" />
            </form>
        </div>
    );
}