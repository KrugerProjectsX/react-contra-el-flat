import  Header from "../components/Header"
import {checkUserLogged} from "../services/actions"

function Home(){

    checkUserLogged();

    return(
        <>
            <Header/>
            <h1>home</h1>
        </>
    )
}

export {Home}