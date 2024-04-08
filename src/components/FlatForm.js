import { Box, Switch, TextField, Button } from "@mui/material";
import { useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import validateInput from "../services/inputValidations";
import { getUserLogged } from "../services/users";

function FlatForm() {
  //get user logged name
  async function getDataUserLogged() {
    const dataUserLogged = await getUserLogged();
    return dataUserLogged.firstName + ' ' + dataUserLogged.lastName;
  }
  

  async function getEmailLogged() {
    const emailLogged = await getUserLogged();
    return emailLogged.email;
  }
  
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

  const currentDate = new Date().toJSON().slice(0, 10);

  const cityRef = useRef("");
  const streetNameRef = useRef("");
  const streetNumberRef = useRef(0);
  const areaSizeRef = useRef(0);
  const hasAcRef = useRef(false);
  const yearBuiltRef = useRef(0);
  const rentPriceRef = useRef(0);
  const dateAvailableRef = useRef(currentDate);

  const navigate = useNavigate();
  const flatsCollectionRef = collection(db, "flats");

  async function addFlat() {
    try {
      const cityValue = cityRef.current.value;
      const streetNameValue = streetNameRef.current.value;
      const streetNumberValue = streetNumberRef.current.value;
      const areaSizeValue = areaSizeRef.current.value;
      const hasAcValue = hasAcRef.current.checked;
      const yearBuiltValue = yearBuiltRef.current.value;
      const rentPriceValue = rentPriceRef.current.value;
      const dateAvailableValue = dateAvailableRef.current.value;

      if (
        cityValue === "" ||
        streetNameValue === "" ||
        streetNumberValue === "" ||
        areaSizeValue === "" ||
        yearBuiltValue === "" ||
        rentPriceValue === "" ||
        dateAvailableValue === ""
      ) {
        alert("Please fill in all fields.");
        return false;
      }

      if (
        !validateInput(cityValue, regex.city) ||
        !validateInput(streetNameValue, regex.streetName) ||
        !validateInput(streetNumberValue, regex.streetNumber) ||
        !validateInput(areaSizeValue, regex.areaSize) ||
        !validateInput(yearBuiltValue, regex.yearBuilt) ||
        !validateInput(rentPriceValue, regex.rentPrice)
      ) {
        alert("Please enter valid values for all fields.");
        // Enfocar el campo que falló la validación
        switch (false) {
          case validateInput(cityValue, regex.city):
            cityRef.current.focus();
            break;
          case validateInput(streetNameValue, regex.streetName):
            streetNameRef.current.focus();
            break;
          case validateInput(streetNumberValue, regex.streetNumber):
            streetNumberRef.current.focus();
            break;
          case validateInput(areaSizeValue, regex.areaSize):
            areaSizeRef.current.focus();
            break;
          case validateInput(yearBuiltValue, regex.yearBuilt):
            yearBuiltRef.current.focus();
            break;
          case validateInput(rentPriceValue, regex.rentPrice):
            rentPriceRef.current.focus();
            break;
          default:
            break;
        }
        return false;
      }

      await addDoc(flatsCollectionRef, {
        city: cityValue,
        streetName: streetNameValue,
        streetNumber: streetNumberValue,
        areaSize: parseInt(areaSizeValue),
        hasAc: hasAcValue,
        yearBuilt: yearBuiltValue,
        rentPrice: parseInt(rentPriceValue),
        dateAvailable: dateAvailableValue,
        user: JSON.parse(localStorage.getItem("user_logged")),
        email: await getEmailLogged(),
        landLord: await getDataUserLogged()
      });

      alert("Flat added successfully!");
      return true;
    } catch (error) {
      console.error("An error occurred while adding the flat: ", error);
      alert("An error occurred when adding the flat. Please try again later.");
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await addFlat();
    if (result !== false) {
      navigate("/dashboard", { replace: false });
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <Box
        className="flex flex-col bg-white shadow-lg shadow-bg-greenish-gray-600 rounded-lg p-6"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl font-bold text-bg-dark-green-900 sm:text-3xl">
          Get started by <br />
          <span>creating a new flat</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Please provide the following information
        </p>
        <div className="flex gap-4">
          <TextField
            inputRef={cityRef}
            type="text"
            label="City"
            variant="outlined"
            className="mb-3"
          />
          <TextField
            inputRef={streetNameRef}
            type="text"
            label="Street Name"
            variant="outlined"
            className="mb-3"
          />
        </div>
        <div className="flex gap-4">
          <TextField
            inputRef={streetNumberRef}
            type="number"
            label="Street Number"
            variant="outlined"
            className="mb-3"
            inputProps={{ min: 0 }}
          />
          <TextField
            inputRef={areaSizeRef}
            type="number"
            label="Area Size"
            variant="outlined"
            className="mb-3"
            inputProps={{ min: 0 }}
          />
        </div>
        <div className="flex gap-4">
          <TextField
            inputRef={yearBuiltRef}
            type="number"
            inputProps={{ min: 1950, max: 2050 }}
            label="Year built"
            variant="outlined"
            className="mb-3 w-full"
          //   onBlur={() =>
          //     (yearBuiltRef.current.value < 1950 || yearBuiltRef.current.value > 2050 || isNaN(yearBuiltRef.current.value))
          //         ? (yearBuiltRef.current.focus(), yearBuiltRef.current.value = '')
          //         : null
          // }
          />
          <Box className="flex items-center mb-3 w-full">
            <Switch inputRef={hasAcRef} />
            <label className="ml-2">Has AC</label>
          </Box>
        </div>
        <TextField
          inputRef={rentPriceRef}
          type="number"
          label="Rent price"
          variant="outlined"
          className="mb-3"
          inputProps={{ min: 0 }}
        />
        <TextField
          inputRef={dateAvailableRef}
          type="date"
          defaultValue={currentDate}
          variant="outlined"
          className="mb-3"
          inputProps={{ min: minDate, max: maxDate }}
        />
        <Button
          variant="contained"
          sx={{ bgcolor: "#6D9773", color: "#fff" }}
          className="uppercase font-bold transition-transform transform hover:scale-105 hover:bg-bg-dark-green-900"
          type="submit"
        >
          Save Flat
        </Button>
      </Box>
    </div>
  );
}

export default FlatForm;
