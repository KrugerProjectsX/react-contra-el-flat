/* Hooks */
import { useRef, useState } from "react";
/* material ui */
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
/* firebase */
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
/* routes */
import { useNavigate } from "react-router-dom";
/* images */
import loginPic from "../images/loginPic.png";
/* components */
import { Error } from "../components/Error";
import { Successful } from "../components/Succesful";

const Login = () => {
  const email = useRef("");
  const password = useRef("");
  const userRef = collection(db, "users");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [successful, setSuccessful] = useState("")

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async (e) => {
    e.preventDefault();
    const search = query(userRef, where("email", "==", email.current.value));
    const result = await getDocs(search);
    if (result.docs.length > 0) {
      const user = result.docs[0].data();
      const user_id = result.docs[0].id;
      if (user.password === password.current.value) {
        localStorage.setItem("user_logged", JSON.stringify(user_id));
        setSuccessful("Login succesful");
        setTimeout(()=>{
          navigate("/dashboard", { replace: true });
        }, 2000)
      } else {
        setError("Email or password incorrect");
      }
    } else {
      setError("Email or password incorrect");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-screen h-screen">
      <div className="h-screen lg:w-1/2">
        <div className="relative w-full h-full flex flex-col">
          <img src={loginPic} alt="login" className="w-full h-full object-cover"></img>
        </div>
      </div>
  
      <div className="w-full lg:w-1/2 h-full flex flex-col bg-white items-center justify-center lg:bg-[#6D9773]">
        <Box
          onSubmit={login}
          component="form"
          noValidate
          autoComplete="off"
          className="w-full lg:w-80 bg-white lg:shadow-xl rounded-xl p-0 lg:p-6 lg:p-10"
        >
          <Typography variant="h4" className="m-2 text-center lg:text-left text-[#0C3B2E]">
            Login
          </Typography>
  
          <TextField
            inputRef={email}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            className="m-2 w-sreen lg:m-2 lg:w-full"
          />

          <TextField
            inputRef={password}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"} // Cambiar el tipo de input según el estado de visibilidad de la contraseña
            className="m-2 w-sreen lg:m-2 lg:w-full"
            InputProps={{
              endAdornment: (
                <div onClick={handlePasswordVisibility} className="cursor-pointer">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </div>
              )
            }}
          />
  
          {error && <Error children={error} />}
          {successful && <Successful children={successful} />}

          <Button
            variant="contained"
            type="submit"
            className="m-2 w-60 lg:w-full bg-[#0C3B2E]"
          >
            Log in
          </Button>
  
  
          <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-start">
            <p className="m-2">Don't have an account?</p>
            <Link href="/register" underline="hover" className="m-2">
              {"Sign up"}
            </Link>
          </div>
        </Box>
      </div>
    </div>
  );
  
};

export { Login };

