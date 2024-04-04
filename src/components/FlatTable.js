// material ui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { collection, query, getDocs, where, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Button } from "@mui/material";
import DeleteFlat from "./DeleteFlat";
// react router
import { useNavigate } from "react-router-dom";
// @Params type: 'my-flats' | 'all-flats' | 'favorite-flats'
function FlatTable({ type }) {

  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const flatsCollectionRef = collection(db, "flats");
  const userId = JSON.parse(localStorage.getItem('user_logged'));
  const reFav = collection(db, 'favorites');

  const [flats, setFlats] = useState([])

  async function getData() {
  
    if (type === 'all-flats') {
      const data = await getDocs(flatsCollectionRef);
      console.log(data);
      try {
        const querySnapshotAll = await getDocs(flatsCollectionRef);
        const flatsData = querySnapshotAll.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFlats(flatsData);
      } catch (error) {
        console.error("Error al obtener los detalles de los flats:", error);
      }
      
    }
  
    if (type === 'favorite-flats') {
      //
    }

    if (type === 'my-flats') {
      try {
        const querySnapshot = await getDocs(query(flatsCollectionRef, where("user", "==", userId)));
        const flatsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setFlats(flatsData);
      } catch (error) {
        // Handle error
        console.error('Error fetching user flats:', error); 
      }
    }
    

  }
  // add favorite
  const addFavorite = async (id) => {
    const reFav = collection(db, 'favorites');
    const data = { userId: userId, flatId: id};
    await addDoc(reFav, data);
  }

  // go to update flat
  function goToUpdate(row) {
    const view = 'update'
    // confirmation message
    const confirmation = window.confirm('go to the edit flat page?');
    if(confirmation) {
        navigate(`/flats/view-flat/edit/${row.id}/${view}`, { state: { flatId: row.id, flag } });
      }
    }

    // go to view flat
  function goToView(row) {
    const view = 'view';
    // confirmation message
    const confirmation = window.confirm('go to the view flat page?');
    if(confirmation) {
        navigate(`/flats/view-flat/edit/${row.id}/${view}`, { state: { flatId: row.id, flag } });
    }
  }
  
  useEffect( () => {
    getData()
  }, [flag]);

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Street name</TableCell>
              <TableCell align="center">Street number</TableCell>
              <TableCell align="center">Area size</TableCell>
              <TableCell align="center">Has AC</TableCell>
              <TableCell align="center">Year built</TableCell>
              <TableCell align="center">Rent price</TableCell>
              <TableCell align="center">Date available</TableCell>
              {/* <TableCell align="center">Actions</TableCell> */}
              <TableCell align="center">Favorite</TableCell>
              <TableCell align="center">View</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flats.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.city}</TableCell>
                <TableCell align="center">{row.streetName}</TableCell>
                <TableCell align="center">{row.streetNumber}</TableCell>
                <TableCell align="center">{row.areaSize}</TableCell>
                <TableCell align="center">{row.hasAc ? "yes" : "no"}</TableCell>
                <TableCell align="center">{row.yearBuilt}</TableCell>
                <TableCell align="center">{row.rentPrice}</TableCell>
                <TableCell align="center">{row.dateAvailable}</TableCell>
                { type === 'my-flats' &&
                <TableCell align="center">
                  <Button onClick={() => goToUpdate(row)}>edit</Button>
                </TableCell> }
                { type === 'my-flats' &&
                <TableCell align="center">
                  <Button onClick={ () => goToView(row) }>view</Button>
                </TableCell> }
                { type === 'my-flats' &&
                <TableCell align="center">
                  <DeleteFlat id={row.id} setFlag={setFlag} />
                </TableCell> }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default FlatTable;
