import FlatTable from "../components/FlatTable"
import Header from "../components/Header"


function Home(){
    return(
        <>
            <Header />
            <h1 className="text-center">All flats</h1>
            <FlatTable type={'all-flats'} />
        </>
    )
}

export default Home;