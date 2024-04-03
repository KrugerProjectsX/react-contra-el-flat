import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { ProfileUpdate } from "./pages/ProfileUpdate";
import "./App.css"
import { Users } from "./pages/Users";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Login/>}/>
      <Route path={"/dashboard"} element={<Home/>}/>
      <Route path={"/register"} element={<Register/>}/>
      <Route path={"/profile"} element={<Profile/>}/>
      <Route path={"/profile/:userId"} element={<Profile/>}/>
      <Route path={"/profile/edit"} element={<ProfileUpdate/>}/>
      <Route path={"/profile/edit/:userId"} element={<ProfileUpdate/>}/>
      <Route path={"/users"} element={<Users/>}/>
    </Routes>
  );
}

export default App;
  