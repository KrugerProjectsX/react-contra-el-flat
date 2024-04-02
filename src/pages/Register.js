/* material ui */
import Typography from "@mui/material/Typography";
/* components */
import { UserForm } from "../components/UserForm";

const Register = () => {
    return(
        <div className="w-screen h-screen bg-white lg:bg-[#6D9773]">
            <UserForm type={'create'}/>
        </div>
    )
}

export {Register};