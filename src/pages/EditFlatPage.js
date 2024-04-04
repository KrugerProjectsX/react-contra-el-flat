import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { EditFlat } from "../components/EditFlat";

function EditFlatPage() {
  const { id } = useParams();
  const location = useLocation();
  const flag = location.state?.flag;
  //const selectedFlat = flats.find(flat => flat.id === id);

  return (
    <div>
      <EditFlat id={id} />
    </div>
  );
}

export { EditFlatPage };
