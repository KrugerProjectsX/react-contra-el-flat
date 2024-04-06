import FlatTable from "../components/FlatTable";
import Header from "../components/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function MyFlats() {

  const navigate = useNavigate();

  function handleClick() {
    // confirmation message
    const confirmation = window.confirm('go to the instert new flat page?');
    if(confirmation) {
        navigate(`/flats/new`);
    }  
  }

  return (
    <>
      <Header />
      <h1 className="text-center">My flats</h1>
      <div className="my-6 flex justify-center items-center">
        <Stack spacing={2} direction="row">
          <Button
          className="uppercase font-bold transition-transform transform hover:scale-105 bg-bg-dark-green-900 hover:bg-bg-dark-green-900"
          onClick={handleClick} variant="contained"
          >insert new flat
          </Button>
        </Stack>
      </div>
      <FlatTable type={"my-flats"} />
    </>
  );
}

export default MyFlats;

