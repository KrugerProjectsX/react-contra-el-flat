/* components */
import { UserForm } from "../components/UserForm";

const Profile = () => {
    return(
        <div className="w-screen h-screen bg-white lg:bg-[#6D9773]">
            <UserForm type={'view'}/>
        </div>
    )
}

export {Profile};