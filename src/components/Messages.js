import {useEffect, useRef, useState} from "react";
import {addDoc, collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase";

const Messages = ({flatId}) => {
    const ref = doc(db, "flats", flatId);
    const refMessages = collection(db, "messages");

    const [flat, setFlat] = useState({});
    const [type, setType] = useState('create');
    const [messages, setMessages] = useState([]);
    const messageInput= useRef('');
    
}

export {Messages};