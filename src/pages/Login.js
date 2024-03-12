import { useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import loginPic from "../images/loginPic.png";
import { Error } from "../components/Error";

const Login = () => {
  const email = useRef("");
  const password = useRef("");
  const userRef = collection(db, "users");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const search = query(userRef, where("email", "==", email.current.value));
    const result = await getDocs(search);
    if (result.docs.length > 0) {
      const user = result.docs[0].data();
      if (user.password === password.current.value) {
        navigate("/dashboard", { replace: true });
      } else {
        alert("email or password incorrect");
      }
    } else {
      alert("email or password incorrect");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-screen h-screen">
      <div className="h-screen lg:w-1/2">
        <div className="relative w-full h-full flex flex-col">
          <img src={loginPic} alt="login" className="w-full h-full object-cover"></img>
        </div>
      </div>
  
      <div className="w-full lg:w-1/2 h-full flex flex-col bg-[#6D9773] items-center justify-center">
        <Box
          onSubmit={login}
          component="form"
          noValidate
          autoComplete="off"
          className="w-full lg:w-80 bg-[#FFFFFF] shadow-xl rounded-xl p-0 lg:p-6 lg:p-10"
        >
          <Typography variant="h4" className="m-2 text-center lg:text-left">
            Login
          </Typography>
  
          <TextField
            inputRef={email}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            className="m-2 w-sreen lg:w-full"
          />
  
          <TextField
            inputRef={password}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            className="m-2 w-sreen lg:w-full"
          />
  
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
