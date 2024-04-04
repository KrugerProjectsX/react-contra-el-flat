// material ui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// firebase - firestore
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
// hooks
import { useState, useEffect } from "react";
// import { EditFlat } from "../components/EditFlat";
import DeleteFlat from "../components/DeleteFlat";
// components
import Header from "../components/Header"

function Flats() {
  const flatsCollectionRef = collection(db, "flats");
  const [flats, setFlats] = useState([]);
  const [flag, setFlag] = useState(false);

  async function getFlats() {
    try {
      const flatsSnapshot = await getDocs(flatsCollectionRef);
      const flatsData = flatsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFlats(flatsData);
    } catch (error) {
      console.error("Error in obtaining flats details:", error);
    }
  }

  useEffect(() => {
    getFlats();
  }, [flag]);

  return (
    <>
      <Header />
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
              <TableCell align="center">Actions</TableCell>
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
                <TableCell align="center">
                  <DeleteFlat id={row.id} setFlag={setFlag} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Flats;
