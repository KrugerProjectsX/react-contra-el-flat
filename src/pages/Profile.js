/* components */
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { UserForm } from "../components/UserForm";

const Profile = () => {

    let {userId} = useParams();

    return(
        <div>
            <Header/>
            <UserForm type={'view'} userId={userId}/>
        </div>
    )
}

export {Profile};