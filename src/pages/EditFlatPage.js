import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { EditFlat } from "../components/EditFlat";
import Header from "../components/Header";
import { Messages } from "../components/Messages";

function EditFlatPage() {
  const { id } = useParams();
  const location = useLocation();
  const flag = location.state?.flag;
  //const selectedFlat = flats.find(flat => flat.id === id);

  return (
    <div>
      <Header />
      <EditFlat id={id} />
      <Messages flatId={id} />
    </div>
  );
}

export { EditFlatPage };
