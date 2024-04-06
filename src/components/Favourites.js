//
import FlatTable from "./FlatTable";
import Header from "./Header";

function Favourites() {

  return (
    <>
      <Header />
      <h1 className="text-center">Favorites Flats</h1>
      <FlatTable type={'favorite-flats'} />
    </>
  );
}

export default Favourites;
