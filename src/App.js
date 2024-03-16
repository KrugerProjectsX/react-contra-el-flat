import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { ProfileUpdate } from "./pages/ProfileUpdate";
import "./App.css"

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Login/>}/>
      <Route path={"/dashboard"} element={<Home/>}/>
      <Route path={"/register"} element={<Register/>}/>
      <Route path={"/profile"} element={<Profile/>}/>
      <Route path={"/profile-edit"} element={<ProfileUpdate/>}/>
    </Routes>
  );
}

export default App;
  