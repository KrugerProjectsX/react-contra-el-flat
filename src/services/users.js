import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

async function getUserLogged(){
    const userId = getUserId();
    if(userId){
        const ref = doc(db, "users", userId);
        const dataUser = await getDoc(ref);
        return {...dataUser.data()};
    }
}

function getUserId(){
    return JSON.parse(localStorage.getItem('user_logged')) || false;
}

export {getUserLogged}