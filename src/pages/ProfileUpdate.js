/* components */
import { useParams } from "react-router-dom";
import { UserForm } from "../components/UserForm";
import Header from "../components/Header";

const ProfileUpdate = () => {
    
    let {userId} = useParams();

    if(userId === undefined){
        userId = null;
    }

    //TODO: verificar que solo el admin pueda actualizar los perfiles de otros.

    return(
        <div>
            <Header/>
            <UserForm type={'update'} userId={userId}/>
        </div>
    )
}

export {ProfileUpdate};