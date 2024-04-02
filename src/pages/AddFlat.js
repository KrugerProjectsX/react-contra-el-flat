import FlatForm from "../components/FlatForm";
import Header from "../components/Header";

function AddFlat() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <h1 className="uppercase text-bg-dark-green-900">{""}</h1>
        <FlatForm />
      </div>
    </>
  );
}

export default AddFlat;
