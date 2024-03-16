/* components */
import { UserForm } from "../components/UserForm";

const ProfileUpdate = () => {
    return(
        <div className="w-screen h-screen bg-white lg:bg-[#6D9773]">
            <UserForm type={'update'}/>
        </div>
    )
}

export {ProfileUpdate};