import { useEffect, useRef, useState } from "react";
import {addDoc,collection,doc,getDoc,getDocs,query,where,} from "firebase/firestore";
import { db } from "../firebase";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Successful } from "./Succesful";

const Messages = ({ flatId }) => {
  
  const ref = doc(db, "flats", flatId);
  const refMessages = collection(db, "messages");

  const [flat, setFlat] = useState({});
  const [type, setType] = useState("create");
  const [messages, setMessages] = useState([]);
  const messageInput = useRef("");

  const [successful, setSuccessful] = useState("");

  const getMessages = async () => {
    const search = query(refMessages, where("flatId", "==", flatId));
    const dataMessages = await getDocs(search);
    const rows = dataMessages.docs.map((item) => {
      return { ...item.data(), id: item.id };
    });
    setMessages(rows);
  };

  const getFlat = async () => {
    const userId = JSON.parse(localStorage.getItem("user_logged"));
    const dataFlat = await getDoc(ref);
    const responseFlat = { ...dataFlat.data() };
    if (responseFlat.user === userId) {
      setType("view");
      await getMessages();
    } else {
      setType("create");
    }
    setFlat(responseFlat);
  };

  useEffect(() => {
    getFlat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = messageInput.current.value;
    const data = {
      message: message,
      flatId: flatId,
      userId: JSON.parse(localStorage.getItem("user_logged")),
    };
    await addDoc(refMessages, data);
    setSuccessful('Your message was sent successfully')
  };

  return (
    <div className="mt-12 p-2 rounded-lg bg-gray-200 shadow-md">
      <h1 className="text-center text-2xl font-bold text-bg-dark-green-900 sm:text-3xl">Messages</h1>
      {successful && <Successful children={successful}/>}
      {type === "create" && (
        <>
          <Box
            component={"form"}
            onSubmit={handleSubmit}
            className="flex
        flex-col
        items-center
        justify-center
        p-4"
          >
            <TextField
              type={"text"}
              label={"Message"}
              inputRef={messageInput}
              multiline
              maxRows={10}
              minRows={10}
              className="mb-4"
            />
            <Button
              type={"submit"}
              className="bg-[#6D9773] text-white uppercase font-bold transition-transform transform hover:scale-105 hover:bg-bg-dark-green-900"
            >
              Send
            </Button>
          </Box>
        </>
      )}
      {type === "view" && (
        <>
          {messages.map((item) => {
            return (
              <div
                key={item.id}
                className="border p-4 m-4 rounded-full bg-blue-100"
              >
                <p className="text-center">{item.message}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export { Messages };
