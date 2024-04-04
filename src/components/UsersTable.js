import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Select from "@mui/material/Select";

function UsersTable() {
  const ref = collection(db, "users");
  const refFlats = collection(db, "flats");

  const [users, setUsers] = useState([]);

  async function getRows(item) {
    const search = query(refFlats, where("user", "==", item.id));
    const dataFlats = await getDocs(search);
    //return {...item.data(), id: item.id, flats: dataFlats.docs?length}
  }

  async function getData() {
    const data = await getDocs(ref);
    const rows = data.docs.map(getRows);

    setUsers(rows);
  }
  function handleSubmitFilter(e) {
    
  }

  return (
    <>
      <Box component={"form"} onSubmit={handleSubmitFilter}>
        <TextField
          select
          label={"User Type"}
          variant="outlined"
          SelectProps={{ native: true }}
        >
          <option key={"none"} value={""}></option>
          <option key={"landlords"} value={"landlords"}>
            landlords
          </option>
          <option key={"renters"} value={"renters"}>
            renters
          </option>
        </TextField>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
    </>
  );
}

export default UsersTable;
