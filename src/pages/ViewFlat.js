// material ui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
// firebase - firestore
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
// hooks
import { useState, useEffect } from "react";
// services
import { getUserLogged } from '../services/users';
// react router
import { useNavigate } from "react-router-dom";
// components
import Header from "../components/Header";


function ViewFlats() {
    const navigate = useNavigate();
    async function getUser() {
        const userlogged = await getUserLogged();
        const userRole = userlogged.role;
        return userRole;
    }
    const userRole = getUser();

    const flatsCollectionRef = collection(db, 'flats');
    const [flats, setFlats] = useState([]);
    const [flag, setFlag] = useState(false);

    async function getFlats() {
        try {
            const flatsSnapshot = await getDocs(flatsCollectionRef);
            const flatsData = flatsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFlats(flatsData);

        } catch (error) {
            console.error('Error in obtaining flats details:', error);
        }
    }

    // go to update flat
    function goToUpdate(row) {
        const view = 'update';
        // confirmation message
        const confirmation = window.confirm('go to the edit flat page?');
        if(confirmation) {
            navigate(`/flats/view-flat/edit/${row.id}/${view}`, { state: { flatId: row.id, flag } });
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
                                <TableCell align="center">{row.hasAc ? 'yes' : 'no'}</TableCell>
                                <TableCell align="center">{row.yearBuilt}</TableCell>
                                <TableCell align="center">{row.rentPrice}</TableCell>
                                <TableCell align="center">{row.dateAvailable}</TableCell>
                                <TableCell align="center">
                                    { userRole === 'owner' && <Button onClick={() => goToUpdate(row)}>Edit</Button> }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ViewFlats;