/* material ui */
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
/* Hooks */
import { useEffect, useRef, useState } from "react";
/* firebase */
import { doc, collection, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
/* routes */
import { useNavigate } from "react-router-dom";

const UserForm = ({ type }) => {

  const currentDate = new Date().toJSON().slice(0, 10);

  const fnameRef = useRef("");
  const lnameRef = useRef("");
  const birthDateRef = useRef(currentDate);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordConfirmationRef = useRef("");

  const [userLoaded, setUserLoaded] = useState(false);

  const id = JSON.parse(localStorage.getItem("user_logged"));

  const refCreate = collection(db, "users");

  let ref = null
  if(id){
    ref = doc(db, "users", id);
  }

  const today = new Date();
  const minBirthDate = new Date(today.getFullYear() - 18,today.getMonth(),today.getDate()).toISOString().split("T")[0];
  const maxBirthDate = new Date(today.getFullYear() - 120,today.getMonth(),today.getDate()).toISOString().split("T")[0];

  let nameButton = "Sign up";

  const navigate = useNavigate();

  if (type === "update") {
    nameButton= "Update";
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = {
      firstName: fnameRef.current.value,
      lastName: lnameRef.current.value,
      birthDate: birthDateRef.current.value,
      email: emailRef.current.value,
    };
    if (type === "create") {
      user = { ...user, password: passwordRef.current.value };
      await addDoc(refCreate, user);
      navigate("/", { replace: true });
    }
    if (type === "update") {
      await updateDoc(ref, user);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="grid grid-cols-2 gap-2 w-full lg:w-80 bg-white lg:shadow-xl rounded-xl p-0 lg:p-6 lg:p-10" onSubmit={handleSubmit}>
        {userLoaded ? (
          <>
            {type === "create" && (
              <Typography variant="h5" className="col-span-2 m-2 text-center text-[#0C3B2E]">Create your account</Typography>
            )}
            {type === "update" && (
              <Typography variant="h5" className="col-span-2 m-2 text-center text-[#0C3B2E]">Update profile information</Typography>
            )}
            {type === "view" && (
              <Typography variant="h5" className="col-span-2 m-2 text-center text-[#0C3B2E]">Profile information</Typography>
            )}

            <TextField
              disabled={type === "view"}
              inputRef={fnameRef}
              defaultValue={user.firstName}
              label="First name"
              variant="outlined"
              type="text"
              className="m-2 col-span-2 lg:col-span-1"
            />
            <TextField
              disabled={type === "view"}
              inputRef={lnameRef}
              defaultValue={user.lastName}
              label="Last name"
              variant="outlined"
              type="text"
              className="m-2 col-span-2 lg:col-span-1"
            />
            <TextField
              disabled={type === "view"}
              inputRef={birthDateRef}
              label="Birth date"
              variant="outlined"
              type="date"
              inputProps={{ min: maxBirthDate, max: minBirthDate }}
              defaultValue={user.birthDate}
              className="m-2 col-span-2 lg:col-span-1"
            />
            <TextField
              disabled={type === "view"}
              inputRef={emailRef}
              defaultValue={user.email}
              label="Email"
              variant="outlined"
              type="email"
              className="m-2 col-span-2 lg:col-span-1"
            />
            {type === "create" && (
              <>
                <TextField
                  inputRef={passwordRef}
                  label="Password"
                  variant="outlined"
                  type="password"
                  className="m-2 col-span-2"
                />
                <TextField
                  inputRef={passwordConfirmationRef}
                  label="Password Confirmation"
                  variant="outlined"
                  type="password"
                  className="m-2 col-span-2"
                />
              </>
            )}
            {type !== "view" && (
              <Button
                variant="contained"
                type="submit"
                className="m-2 bg-[#FFBA00] col-span-2"
              >
                {nameButton}
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
