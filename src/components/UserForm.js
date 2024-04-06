import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import { doc, collection, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Error } from "./Error";
import { Successful } from "./Succesful";

const UserForm = ({ type, userId }) => {
  const currentDate = new Date().toJSON().slice(0, 10);

  const fnameRef = useRef("");
  const lnameRef = useRef("");
  const birthDateRef = useRef(currentDate);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordConfirmationRef = useRef("");
  const userRoleRef = useRef("");
  const [error, setError] = useState("");
  const [successful, setSuccesful] = useState("");

  const userLogged = JSON.parse(localStorage.getItem("user_logged"));

  let ref = null;
  if (userId == null && type !== "create") {
    userId = userLogged;
  }
  if (userId && type !== "create") {
    ref = doc(db, "users", userId);
  }

  const [userLoaded, setUserLoaded] = useState(false);

  const refCreate = collection(db, "users");

  const today = new Date();
  const minBirthDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];
  const maxBirthDate = new Date(
    today.getFullYear() - 120,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  let nameButton = "Sign up";

  const navigate = useNavigate();

  if (type === "update") {
    nameButton = "Update";
  }

  const goToUpdate = (e) => {
    e.preventDefault();
    navigate("/profile/edit");
  };

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
  });

  const getUserData = async () => {
    const dataUser = await getDoc(ref);
    const responseUser = { ...dataUser.data() };
    setUser(responseUser);
    setUserLoaded(true);
  };

  const processData = async () => {
    if (type === "view" || type === "update") {
      await getUserData();
    } else {
      setUserLoaded(true);
    }
  };

  useEffect(() => {
    processData();
  }, []);

  const fieldsValidations = async (e) => {
    e.preventDefault();
  
    let user = {
      firstName: fnameRef.current.value,
      lastName: lnameRef.current.value,
      birthDate: birthDateRef.current.value,
      email: emailRef.current.value,
      role: userRoleRef.current.value,
    };
  
    const nameValidation = () => {
      if (
        fnameRef.current.value.length < 2 ||
        lnameRef.current.value.length < 2
      ) {
        setError("Name must be at least 2 characters long");
        return false;
      } else {
        return true;
      }
    };
  
    const passwordValidation = () => {
      const validate = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/;
      if (validate.test(passwordRef.current.value)) {
        return true;
      } else {
        setError(
          "Password must be at least 6 characters long and contain capital and lowercase letters, numbers, and symbols."
        );
        return false;
      }
    };
  
    const passwordConfirmationValidation = () => {
      if (passwordConfirmationRef.current.value !== passwordRef.current.value) {
        setError("The password confirmation does not match");
        return false;
      } else {
        return true;
      }
    };
  
    if (
      nameValidation() &&
      passwordValidation() &&
      passwordConfirmationValidation()
    ) {
      user = { ...user, password: passwordRef.current.value };
      // Guardar el usuario en Firestore
      const docRef = await addDoc(refCreate, user);
      // Obtener el ID del usuario recién creado
      const user_id = docRef.id;
      // Guardar el ID del usuario en el localStorage
      localStorage.setItem("user_logged", JSON.stringify(user_id));
      setSuccesful("Account created successfully");
        setTimeout(()=>{
          navigate("/dashboard", { replace: true });
        }, 2000)
    }
  };
  

  const handleSubmit = async (e) => { 
    e.preventDefault();
    let user = {
      firstName: fnameRef.current.value,
      lastName: lnameRef.current.value,
      birthDate: birthDateRef.current.value,
      email: emailRef.current.value,
      role: userRoleRef.current.value,
    };
    if (type === "create") {
      await fieldsValidations(e);
    }
    if (type === "update") {
      await updateDoc(ref, user);

      setSuccesful("The information was successfully updated.");
      setTimeout(()=>{
        navigate(-1);
      }, 2000) 

    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="grid grid-cols-2 gap-2 w-full lg:w-80 bg-white lg:shadow-xl rounded-xl p-0 lg:p-6 lg:p-10"
        onSubmit={handleSubmit}
      >
        {userLoaded ? (
          <>
            {type === "create" && (
              <Typography
                variant="h5"
                className="col-span-2 m-1 text-center text-[#0C3B2E]"
              >
                Create your account
              </Typography>
            )}
            {type === "update" && (
              <Typography
                variant="h5"
                className="col-span-2 m-1 text-center text-[#0C3B2E]"
              >
                Update profile information
              </Typography>
            )}
            {type === "view" && (
              <Typography
                variant="h5"
                className="col-span-2 m-1 text-center text-[#0C3B2E]"
              >
                Profile information
              </Typography>
            )}
            <TextField
              required={type === "create"}
              disabled={type === "view"}
              inputRef={fnameRef}
              defaultValue={user.firstName}
              label="First name"
              variant="outlined"
              type="text"
              className="m-1 col-span-2 lg:col-span-1"
            />
            <TextField
              required={type === "create"}
              disabled={type === "view"}
              inputRef={lnameRef}
              defaultValue={user.lastName}
              label="Last name"
              variant="outlined"
              type="text"
              className="m-1 col-span-2 lg:col-span-1"
            />
            <TextField
              required={type === "create"}
              disabled={type === "view"}
              inputRef={birthDateRef}
              label="Birth date"
              variant="outlined"
              type="date"
              inputProps={{ min: maxBirthDate, max: minBirthDate }}
              defaultValue={user.birthDate}
              className="m-1 col-span-2 lg:col-span-1"
            />
            <TextField
              required={type === "create"}
              disabled={type === "view"}
              inputRef={emailRef}
              defaultValue={user.email}
              label="Email"
              variant="outlined"
              type="email"
              className="m-1 col-span-2 lg:col-span-1"
            />
            <TextField
              required={type === "create"}
              select
              label="User role"
              variant="outlined"
              disabled={type === "view"}
              SelectProps={{ native: true }}
              defaultValue={user.role}
              className="m-1 col-span-2"
              inputRef={userRoleRef}
            >
              <option key="none" value=""></option>
              <option key="landlord" value="landlord">
                Landlord
              </option>
              <option key="renter" value="renter">
                Renter
              </option>
              {userLogged === 'sKA5aa0KtEYZdGp8CqKe' && (<option key="admin" value="admin">Admin</option>)}
            </TextField>
            {type === "create" && (
              <>
                <TextField
                  required
                  inputRef={passwordRef}
                  label="Password"
                  variant="outlined"
                  type="password"
                  className="m-2 col-span-2"
                />
                <TextField
                  required
                  inputRef={passwordConfirmationRef}
                  label="Password Confirmation"
                  variant="outlined"
                  type="password"
                  className="m-2 col-span-2"
                />
              </>
            )}
            {error && <Error children={error} />}
            {successful && <Successful children={successful} />}
            {type !== "view" && (
              <Button
                variant="contained"
                type="submit"
                className="m-1 bg-[#FFBA00] col-span-2"
              >
                {nameButton}
              </Button>
            )}
            {type === "view" && (
              <Button
                variant="contained"
                type="button"
                className="m-2 bg-[#FFBA00] col-span-2"
                onClick={goToUpdate}
              >
                Update user information
              </Button>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </form>
    </div>
  );
};

export { UserForm };
