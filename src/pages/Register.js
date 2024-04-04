/* components */
import { UserForm } from "../components/UserForm";

const Register = () => {
    return(
        <div className="w-full h-full bg-white lg:bg-[#6D9773]">
            <UserForm type={'create'} id={null}/>
            <div className="h-8">

            </div>
        </div>
    )
}

export {Register};