// material ui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// firebase
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";
// hooks
import { useEffect, useState } from "react";
//
import Header from "./Header";


function Favourites() {
  // const flatsCollectionRef = collection(db, "flats");
  // const userId = JSON.parse(localStorage.getItem("usr_logged"));
  const [flats, setFlats] = useState([]);

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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Favourites;
