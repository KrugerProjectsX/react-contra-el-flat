import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { Box } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function EditFlat({ id }) {

  const navigate = useNavigate();

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
      {flatData && (
        <div className="flex items-center justify-center w-full">
          <Box
            className="flex flex-col bg-white shadow-lg shadow-bg-greenish-gray-600 rounded-lg p-6"
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center text-2xl font-bold text-bg-dark-green-900 sm:text-3xl">
              Update flat information
            </h1>
            <div className="flex gap-4">
              <TextField
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
                name="yearBuilt"
                type="number"
                label="Year built"
                variant="outlined"
                className="mb-3 w-full"
                value={formData.yearBuilt}
                onChange={handleInputChange}
                inputProps={{ min: 1950, max: 2050, pattern: regex.yearBuilt.source }}
              />
              <Box className="flex items-center mb-3 w-full">
                <Switch
                  name="hasAc"
                  checked={formData.hasAc}
                  onChange={(e) => setFormData({ ...formData, hasAc: e.target.checked })}
                />
                <label className="ml-2">Has AC</label>
              </Box>
            </div>
            <TextField
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
              name="dateAvailable"
              type="date"
              variant="outlined"
              className="mb-3"
              value={formData.dateAvailable}
              onChange={handleInputChange}
              inputProps={{ min: minDate, max: maxDate }}
            />
            <Button
              variant="contained"
              sx={{ bgcolor: "#6D9773", color: "#fff" }}
              className="uppercase font-bold transition-transform transform hover:scale-105 hover:bg-bg-dark-green-900"
              type="submit"
            >
              Update Flat
            </Button>
          </Box>
        </div>
      )}
    </>
  );
}

export  { EditFlat } ;
