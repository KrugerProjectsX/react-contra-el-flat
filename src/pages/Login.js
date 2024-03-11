import { useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const email = useRef("");
    const password = useRef("");
    const userRef = collection(db, 'users');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const search = query(userRef, where('email', "==" , email.current.value))
        const result = await getDocs(search);
        if(result.docs.length > 0){
            const user = result.docs[0].data()
            if(user.password === password.current.value){
                navigate("/dashboard", {replace: true})
            }else{
                alert("email or password incorrect")
            }
        }else{
            alert("email or password incorrect")
        }
    };

  return (
    <>
    <div className="flex justify-center">
      <Box
        onSubmit={login}
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          inputRef={email}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          className=""
        />

        <TextField
          inputRef={password}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
        />

        <Button variant="contained" type="submit">Log in</Button>
        
      </Box>
    </div>
    </>
  );
};

export { Login };
