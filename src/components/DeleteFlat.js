//material ui
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// firebase
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

function DeleteFlat({ id, setFlag }) {
  let flatRef = doc(db, "flats", id);

  async function deleteFlats() {
    // confirmation message
    const confirmation = window.confirm(
      "Are you sure you want to remove the flat?"
    );
    if (confirmation) {
      try {
        await deleteDoc(flatRef);
        setFlag((prev) => !prev);
        alert("Deleted flat succesfully");
      } catch (error) {
        alert(
          "An error occurred while trying to delete the flat. Please try again later." +
            error
        );
      }
    }
  }

  return (
    <>
      <IconButton aria-label="delete">
        <DeleteIcon onClick={deleteFlats} fontSize="small" />
      </IconButton>
    </>
  );
}

export default DeleteFlat;
