/* react hooks */
import * as React from "react";
import { useEffect, useState } from "react";
/* material ui */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
/* firebase */
import {
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function UsersTable() {
  const ref = collection(db, "users");
  const refFlats = collection(db, "flats");
  const [userType, setUserType] = useState("");
  const [flatsCounter, setFlatsCounter] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [orderBy, setOrderBy] = useState("firstName");

  const [users, setUsers] = useState([]);

  const [flag, setFlag] = useState(false);

  const getData = async () => {
    let arrayWhere = [];

    if (userType) {
      arrayWhere.push(where("role", "==", userType));
    }

    if (ageValue) {
      const today = new Date();
      const minBirthDate = new Date(
        today.getFullYear() - ageValue,
        today.getMonth(),
        today.getDate()
      );
      const maxBirthDate = new Date(
        today.getFullYear() - ageValue - 1,
        today.getMonth(),
        today.getDate()
      );

      arrayWhere.push(where("birthDate", ">=", minBirthDate));
      arrayWhere.push(where("birthDate", "<", maxBirthDate));
    }

    const searchUser = query(ref, ...arrayWhere);

    const data = await getDocs(searchUser);
    const usersSet = [];

    for (const item of data.docs) {
      const search = query(refFlats, where("user", "==", item.id));
      const dataFlats = await getDocs(search);

      if (flatsCounter) {
        const flatsValue = flatsCounter.split("-");
        if (flatsValue.length > 1) {
          const min = flatsValue[0];
          const max = flatsValue[1];
          if (dataFlats.docs?.length < min || dataFlats.docs?.length > max) {
            continue;
          }
        } else {
          if (flatsValue[0] === "61+") {
            if (dataFlats.docs?.length < 61) {
              continue;
            }
          }
        }
      }
      const userWithFlats = {
        ...item.data(),
        id: item.id,
        flats: dataFlats.docs?.length,
      };

      usersSet.push(userWithFlats);
    }

    setUsers(usersSet);
  };

  const sortUsers = (users) => {
    return users.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return -1;
      if (a[orderBy] > b[orderBy]) return 1;
      return 0;
    });
  };

  const deleteUser = async (id) => {
    const refUser = doc(db, "users", id);
    await deleteDoc(refUser);
    setFlag(true);
  };

  useEffect(() => {
    getData();
  }, [userType, flatsCounter, ageValue, flag]);

  return (
    <>
      <Box
        component="form"
        className="flex justify-center mx-auto max-w-screen-md mb-4"
      >
        <div className="lg:flex justify-center items-center space-x-4 text-center">
          <TextField
            select
            label="Order By"
            variant="outlined"
            SelectProps={{ native: true }}
            className="w-40 my-6"
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="flats">Flats Count</option>
          </TextField>
          <TextField
            select
            label="User Type"
            variant="outlined"
            SelectProps={{ native: true }}
            className="w-40 my-6"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option key="none" value=""></option>
            <option key="landlord" value="landlord">
              Landlords
            </option>
            <option key="renter" value="renter">
              Renters
            </option>
            <option key="admin" value="admin">
              Admins
            </option>
          </TextField>

          <TextField
            select
            label="Flats Counter"
            variant="outlined"
            SelectProps={{ native: true }}
            className="w-40 my-6"
            value={flatsCounter}
            onChange={(e) => setFlatsCounter(e.target.value)}
          >
            <option key="none" value=""></option>
            <option key="0-5" value="0-5">
              0-5
            </option>
            <option key="6-20" value="6-20">
              6-20
            </option>
            <option key="21-60" value="21-60">
              21-60
            </option>
            <option key="61+" value="61+">
              61+
            </option>
          </TextField>

          <TextField
            type="number"
            label="Age"
            variant="outlined"
            className="w-40 my-6"
            onChange={(e) => setAgeValue(parseInt(e.target.value))}
          ></TextField>
        </div>
      </Box>

      <TableContainer>
        <Table
          className="min-w-full divide-y divide-gray-200"
          aria-label="simple table"
        >
          <TableHead className="bg-[#6D9773]">
            <TableRow>
              <TableCell
                className="px-6 py-3 text-xs font-medium text-[#0C3B2E] uppercase tracking-wider"
                align="center"
              >
                First Name
              </TableCell>
              <TableCell
                className="px-6 py-3 text-xs font-medium text-[#0C3B2E] uppercase tracking-wider"
                align="center"
              >
                Last Name
              </TableCell>
              <TableCell
                className="px-6 py-3 text-xs font-medium text-[#0C3B2E] uppercase tracking-wider"
                align="center"
              >
                Email
              </TableCell>
              <TableCell
                className="px-6 py-3 text-xs font-medium text-[#0C3B2E] uppercase tracking-wider"
                align="center"
              >
                Birth Date
              </TableCell>
              <TableCell
                className="px-6 py-3 text-xs font-medium text-[#0C3B2E] uppercase tracking-wider"
                align="center"
              >
                Role
              </TableCell>
              <TableCell
                className="px-6 py-3 text-xs font-medium text-[#0C3B2E] uppercase tracking-wider"
                align="center"
              >
                Flats Count
              </TableCell>
              <TableCell
                className="px-6 py-3 text-xs font-medium text-[#0C3B2E] uppercase tracking-wider"
                align="center"
              >
                Edit user
              </TableCell>
              <TableCell
                className="px-6 py-3 text-xs font-medium text-[#0C3B2E] uppercase tracking-wider"
                align="center"
              >
                Delete user
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-white divide-y divide-gray-200">
            {sortUsers(users).map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  className="px-6 py-4 whitespace-nowrap"
                  align="center"
                >
                  {row.firstName}
                </TableCell>
                <TableCell
                  className="px-6 py-4 whitespace-nowrap"
                  align="center"
                >
                  {row.lastName}
                </TableCell>
                <TableCell
                  className="px-6 py-4 whitespace-nowrap"
                  align="center"
                >
                  {row.email}
                </TableCell>
                <TableCell
                  className="px-6 py-4 whitespace-nowrap"
                  align="center"
                >
                  {row.birthDate}
                </TableCell>
                <TableCell
                  className="px-6 py-4 whitespace-nowrap"
                  align="center"
                >
                  {row.role}
                </TableCell>
                <TableCell
                  className="px-6 py-4 whitespace-nowrap"
                  align="center"
                >
                  {row.flats}
                </TableCell>
                <TableCell
                  className="px-6 py-4 whitespace-nowrap"
                  align="center"
                >
                  <Button
                    className="text-[#0C3B2E]"
                    href={`/profile/edit/${row.id}`}
                  >
                    <EditIcon></EditIcon>
                  </Button>
                </TableCell>
                <TableCell
                  className="px-6 py-4 whitespace-nowrap"
                  align="center"
                >
                  <Button
                    className="text-[#0C3B2E]"
                    onClick={() => deleteUser(row.id)}
                  >
                    <DeleteIcon></DeleteIcon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
