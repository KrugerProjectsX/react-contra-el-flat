import { Route, Routes } from "react-router-dom";

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
    </Routes>
  );
}

export default App;
