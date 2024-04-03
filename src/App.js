import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { ProfileUpdate } from "./pages/ProfileUpdate";
import "./App.css"
import { Users } from "./pages/Users";
import AddFlat from "./pages/AddFlat";
import Flats from "./pages/Flats";
import ViewFlat from "./pages/ViewFlat";
import MyFlats from "./pages/MyFlats";
import { EditFlatPage } from "./pages/EditFlatPage";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path={"/flats"} element={<Flats />}/>
      <Route path={"/flats/new"} element={<AddFlat />}/>
      <Route path={"/flats/view-flat"} element={<ViewFlat />}/>
      <Route path={"/flats/view-flat/edit/:id"} element={<EditFlatPage/>}/>
      <Route path={"/flats/my-flats"} element={<MyFlats />}/>
      <Route path={"/flats/my-favorite-flats"} element={<MyFlats />}/>

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
