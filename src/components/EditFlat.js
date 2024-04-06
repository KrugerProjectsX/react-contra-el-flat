import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { Box } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function EditFlat({ id }) {
  let location = useLocation();
  location = location.pathname.substring(location.pathname.length - 4);
  console.log(location);
  const navigate = useNavigate();
  //console.log('VIEW: ' + view);

  const regex = {
    city: /^[\w\s'-]+$/,
    streetName: /^[\w\s'-]+$/,
    streetNumber: /^\d+$/,
    areaSize: /^\d+$/,
    yearBuilt: /^\d{4}$/,
    rentPrice: /^\d+$/,
  };

  const minDate = "1990-01-01";
  const maxDate = "2050-12-31";

  const [flatData, setFlatData] = useState(null);
  const [formData, setFormData] = useState({
    city: '',
    streetName: '',
    streetNumber: '',
    areaSize: '',
    hasAc: false,
    yearBuilt: '',
    rentPrice: '',
    dateAvailable: '',
  });

  async function fetchFlatData() {
    try {
      const flatDoc = await getDoc(doc(db, 'flats', id));
      if (flatDoc.exists()) {
        setFlatData(flatDoc.data());
        console.log(flatData);
        setFormData(flatDoc.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.log('Error getting document:', error);
    }
  }

  useEffect(() => {
    fetchFlatData();
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateDataFlat(formData);
      alert('Flat updated successfully!');
      navigate(`/flats`, { replace: false });
    } catch (error) {
      alert('Error updating flat:', error);
    }
  }

  async function updateDataFlat(data) {
    const flatRef = doc(db, 'flats', id);
    await updateDoc(flatRef, data);
  }

  return (
    <>
      {location === "view" && (
        <h1 className="text-center text-2xl font-bold text-bg-dark-green-900 sm:text-3xl">
          View flat information
        </h1>
      )}
      {location !== "view" && (
        <h1 className="text-center text-2xl font-bold text-bg-dark-green-900 sm:text-3xl">
          Update flat information
        </h1>
      )}
      {flatData && (
        <div className="flex items-center justify-center w-full">
          <Box
            className="flex flex-col bg-white shadow-lg shadow-bg-greenish-gray-600 rounded-lg p-6"
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-4">
              <TextField
                disabled={location === "view"}
                name="city"
                type="text"
                label="City"
                variant="outlined"
                className="mb-3"
                value={formData.city}
                onChange={handleInputChange}
                inputProps={{ pattern: regex.city.source }}
              />
              <TextField
                disabled={location === "view"}
                name="streetName"
                type="text"
                label="Street Name"
                variant="outlined"
                className="mb-3"
                value={formData.streetName}
                onChange={handleInputChange}
                inputProps={{ pattern: regex.streetName.source }}
              />
            </div>
            <div className="flex gap-4">
              <TextField
                disabled={location === "view"}
                name="streetNumber"
                type="number"
                label="Street Number"
                variant="outlined"
                className="mb-3"
                value={formData.streetNumber}
                onChange={handleInputChange}
                inputProps={{ min: 0, pattern: regex.streetNumber.source }}
              />
              <TextField
                disabled={location === "view"}
                name="areaSize"
                type="number"
                label="Area Size"
                variant="outlined"
                className="mb-3"
                value={formData.areaSize}
                onChange={handleInputChange}
                inputProps={{ min: 0, pattern: regex.areaSize.source }}
              />
            </div>
            <div className="flex gap-4">
              <TextField
                disabled={location === "view"}
                name="yearBuilt"
                type="number"
                label="Year built"
                variant="outlined"
                className="mb-3 w-full"
                value={formData.yearBuilt}
                onChange={handleInputChange}
                inputProps={{
                  min: 1950,
                  max: 2050,
                  pattern: regex.yearBuilt.source,
                }}
              />
              <Box className="flex items-center mb-3 w-full">
                <Switch
                  disabled={location === "view"}
                  name="hasAc"
                  checked={formData.hasAc}
                  onChange={(e) =>
                    setFormData({ ...formData, hasAc: e.target.checked })
                  }
                />
                <label className="ml-2">Has AC</label>
              </Box>
            </div>
            <TextField
              disabled={location === "view"}
              name="rentPrice"
              type="number"
              label="Rent price"
              variant="outlined"
              className="mb-3"
              value={formData.rentPrice}
              onChange={handleInputChange}
              inputProps={{ min: 0, pattern: regex.rentPrice.source }}
            />
            <TextField
              disabled={location === "view"}
              name="dateAvailable"
              type="date"
              variant="outlined"
              className="mb-3"
              value={formData.dateAvailable}
              onChange={handleInputChange}
              inputProps={{ min: minDate, max: maxDate }}
            />
            {location !== "view" && (
              <Button
                variant="contained"
                sx={{ bgcolor: "#6D9773", color: "#fff" }}
                className="uppercase font-bold transition-transform transform hover:scale-105 hover:bg-bg-dark-green-900"
                type="submit"
              >
                Update Flat
              </Button>
            )}
            {location === "view" && (
              <Button
                sx={{ bgcolor: "#6D9773", color: "#fff" }}
                className="uppercase font-bold transition-transform transform hover:scale-105 hover:bg-bg-dark-green-900"
                onClick={() => {
                  navigate(
                    `/flats/view-flat/edit/${id}/${(location = "update")}`,
                    { state: { flatId: id } }
                  );
                }}
              >
                update
              </Button>
            )}
          </Box>
        </div>
      )}
    </>
  );
}

export { EditFlat } ;
