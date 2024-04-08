import FlatTable from "../components/FlatTable"
import Header from "../components/Header"


function Home(){
    return(
        <>
            <Header />
            <h1 className="text-center text-2xl font-bold text-bg-dark-green-900 sm:text-3xl">All flats</h1>
            <FlatTable type={'all-flats'} />
        </>
    )
}

export {Home};