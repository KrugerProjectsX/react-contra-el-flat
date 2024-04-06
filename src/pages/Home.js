import FlatTable from "../components/FlatTable"
import Header from "../components/Header"


function Home(){
    return(
        <>
            <Header />
            <FlatTable type={'all-flats'} />
        </>
    )
}

export {Home};