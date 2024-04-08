// material ui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { collection, query, getDocs, where, addDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Button, TextField } from "@mui/material";
import DeleteFlat from "./DeleteFlat";
// react router
import { useNavigate } from "react-router-dom";
// @Params type: 'my-flats' | 'all-flats' | 'favorite-flats'
function FlatTable({ type }) {

  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const flatsCollectionRef = collection(db, "flats");
  const userId = JSON.parse(localStorage.getItem('user_logged'));
  const reFav = collection(db, 'favorites');
  const ref = collection(db, "flats");
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(false);

  // search states
  const [city, setCity] = useState("");
  const [rentPrice, setRentPrice] = useState(0);
  const [areaSize, setAreaSize] = useState(0);
 
  //let flatQuery = query(flatsCollectionRef);

  async function getData() {
    setLoading(true);
    if (type === "all-flats") {
      try {
        if (type === "all-flats") {
          let arrayWhere = [];
          if (city) {
            arrayWhere.push(where("city", "==", city));
          }
          if (areaSize) {
            let settings = areaSize.split("-");
            arrayWhere.push(where("areaSize", ">=", parseInt(settings[0])));
            arrayWhere.push(where("areaSize", "<=", parseInt(settings[1])));
          }
          if (rentPrice) {
            let settings = rentPrice.split("-");
            console.log(settings);
            arrayWhere.push(where("rentPrice", ">=", parseInt(settings[0])));
            arrayWhere.push(where("rentPrice", "<=", parseInt(settings[1])));
          }
          let searchFlats = query(ref, ...arrayWhere);
          const results = await getDocs(searchFlats);
          const allFlats = [];
          for (const item of results.docs) {
            const search = query(
              reFav,
              where("userId", "==", userId),
              where("flatId", "==", item.id)
            );
            const dataFav = await getDocs(search);
            let favorite = false;
    
            if (dataFav.docs.length > 0) {
              favorite = dataFav.docs[0].id;
            }
            const flatWhitFav = { ...item.data(), id: item.id, favorite: favorite };
            allFlats.push(flatWhitFav);
          }
    
          setFlats(allFlats);
        }
          setLoading(true);
      } catch (error) {
        console.error("Error al obtener los detalles de los flats:", error);
      }
    }

    if (type === "favorite-flats") {
      const search = query(reFav, where("userId", "==", userId));
      const data = await getDocs(search);
      const allFlats = [];
      for (let i of data.docs) {
        const refFlat = doc(db, "flats", i.data().flatId);
        const dataFlat = await getDoc(refFlat);
        allFlats.push({ ...dataFlat.data(), id: dataFlat.id, favorite: i.id });
      }
      setFlats(allFlats);
    }

    if (type === "my-flats") {
      try {
        const querySnapshot = await getDocs(
          query(flatsCollectionRef, where("user", "==", userId))
        );
        const flatsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setFlats(flatsData);
      } catch (error) {
        // Handle error
        console.error("Error fetching user flats:", error);
      }
    }

    // // select min/max price
    // // select min/max area range query

    // const data = await getDocs(flatQuery);
    // const flatsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
  }
  // add favorite
  async function addFavorite(id) {
    const existFlat = query(reFav, where("userId", "==", userId), where("flatId", "==", id));
    const existData = await getDocs(existFlat);
    if (existData.docs.length > 0) {
      alert('This flat is already on your favorites list');
      return;
    } else {
      const data = { userId: userId, flatId: id};
      await addDoc(reFav, data);
      setFlag(!flag);
    }
  }

  // remove favorite
  async function removeFavorite(id) {
    const refRemoveFav = doc(db,"favorites",id)
    await deleteDoc(refRemoveFav);
    setFlag(!flag);
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
  }, [flag, city, areaSize, rentPrice]);

  return (
    <>
      {type !== "my-flats" && (
        <div className="flex flex-col m-4 gap-4 md:flex-row">
          <TextField
            label="City"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        <TextField
            select
            label={"Area Size Range"}
            variant="outlined"
            SelectProps={{ native: true }}
            value={areaSize}
            onChange={(e) => setAreaSize(e.target.value)}
            fullWidth
            sx={{ marginBottom: "20px" }}
          >
            <option key={"none"} value={""}></option>
            <option key={"100-200"} value={"100-200"}>
              {" "}
              100 - 200
            </option>
            <option key={"200-300"} value={"201-300"}>
              {" "}
              200 - 300{" "}
            </option>
            <option key={"300-400"} value={"301-400"}>
              {" "}
              300 - 400{" "}
            </option>
            <option key={"400-500"} value={"401-500"}>
              {" "}
              400 - 500{" "}
            </option>
            <option key={"500-600"} value={"501-600"}>
              {" "}
              500 - 600{" "}
            </option>
            <option key={"600-700"} value={"601-700"}>
              {" "}
              600 - 700{" "}
            </option>
            <option key={"700-800"} value={"701-800"}>
              {" "}
              700 - 800{" "}
            </option>
            <option key={"800-900"} value={"801-900"}>
              {" "}
              800 - 900{" "}
            </option>
            <option key={"900-1000"} value={"901-1000"}>
              {" "}
              900 - 1000{" "}
            </option>
            <option key={"1000"} value={"+1000"}>
              {" "}
              + 1000{" "}
            </option>
          </TextField>
          <TextField
            select
            label={"Rent Price Range"}
            variant="outlined"
            SelectProps={{ native: true }}
            value={rentPrice}
            onChange={(e) => setRentPrice(e.target.value)}
            fullWidth
            sx={{ marginBottom: "20px" }}
          >
            <option key={"none"} value={""}></option>
            <option key={"100-200"} value={"100-200"}>
              {" "}
              100 - 200
            </option>
            <option key={"200-300"} value={"201-300"}>
              {" "}
              200 - 300{" "}
            </option>
            <option key={"300-400"} value={"301-400"}>
              {" "}
              300 - 400{" "}
            </option>
            <option key={"400-500"} value={"401-500"}>
              {" "}
              400 - 500{" "}
            </option>
            <option key={"500-600"} value={"501-600"}>
              {" "}
              500 - 600{" "}
            </option>
            <option key={"600-700"} value={"601-700"}>
              {" "}
              600 - 700{" "}
            </option>
            <option key={"700-800"} value={"701-800"}>
              {" "}
              700 - 800{" "}
            </option>
            <option key={"800-900"} value={"801-900"}>
              {" "}
              800 - 900{" "}
            </option>
            <option key={"900-1000"} value={"901-1000"}>
              {" "}
              900 - 1000{" "}
            </option>
            <option key={"1000"} value={"+1000"}>
              {" "}
              + 1000{" "}
            </option>
          </TextField>
          <TextField
            select
            label={"Rent Price Range"}
            variant="outlined"
            SelectProps={{ native: true }}
            value={rentPrice}
            onChange={(e) => setRentPrice(e.target.value)}
            fullWidth
            sx={{ marginBottom: "20px" }}
          >
            <option key={"none"} value={""}></option>
            <option key={"100-200"} value={"100-200"}>
              {" "}
              100 - 200
            </option>
            <option key={"200-300"} value={"201-300"}>
              {" "}
              200 - 300{" "}
            </option>
            <option key={"300-400"} value={"301-400"}>
              {" "}
              300 - 400{" "}
            </option>
            <option key={"400-500"} value={"401-500"}>
              {" "}
              400 - 500{" "}
            </option>
            <option key={"500-600"} value={"501-600"}>
              {" "}
              500 - 600{" "}
            </option>
            <option key={"600-700"} value={"601-700"}>
              {" "}
              600 - 700{" "}
            </option>
            <option key={"700-800"} value={"701-800"}>
              {" "}
              700 - 800{" "}
            </option>
            <option key={"800-900"} value={"801-900"}>
              {" "}
              800 - 900{" "}
            </option>
            <option key={"900-1000"} value={"901-1000"}>
              {" "}
              900 - 1000{" "}
            </option>
            <option key={"1000"} value={"+1000"}>
              {" "}
              + 1000{" "}
            </option>
          </TextField>
        </div>
      )}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-bg-tan-600 uppercase">
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Street name</TableCell>
              <TableCell align="center">Street number</TableCell>
              <TableCell align="center">Area size</TableCell>
              <TableCell align="center">Has AC</TableCell>
              <TableCell align="center">Year built</TableCell>
              <TableCell align="center">Rent price</TableCell>
              <TableCell align="center">Date available</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Owner</TableCell>
              {type === "my-flats" && (
                <TableCell align="center">Edit</TableCell>
              )}
              {(type === "my-flats" ||
                type === "all-flats" ||
                type === "favorite-flats") && (
                <TableCell align="center">View</TableCell>
              )}
              {(type === "all-flats" || type === "favorite-flats") && (
                <TableCell align="center">
                  Favorites
                </TableCell>
              )}
              {type === "my-flats" && (
                <TableCell align="center">Delete</TableCell>
              )}
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
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.landLord}</TableCell>
                {type === "my-flats" && (
                  <TableCell align="center">
                    <Button onClick={() => goToUpdate(row)}>edit</Button>
                  </TableCell>
                )}
                {(type === "my-flats" ||
                  type === "all-flats" ||
                  type === "favorite-flats") && (
                  <TableCell align="center">
                    <Button
                    className=""
                     onClick={() => goToView(row)}><VisibilityIcon/></Button>
                  </TableCell>
                )}
                {type === "my-flats" && (
                  <TableCell align="center">
                    <DeleteFlat id={row.id} setFlag={setFlag} />
                  </TableCell>
                )}
                {(type === "all-flats" || type === "favorite-flats") && (
                  <TableCell align="center">
                    {!row.favorite && (
                      <Button
                      className="text-[#FF0000]"
                      onClick={() => addFavorite(row.id)}> <FavoriteBorderIcon /> </Button>
                    )}
                    {row.favorite && (
                      <Button
                      className="text-[#FF0000]"
                      onClick={() => removeFavorite(row.favorite)}>
                        <FavoriteIcon />
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default FlatTable;
