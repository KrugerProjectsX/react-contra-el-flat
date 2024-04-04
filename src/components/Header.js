import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuTransitions from "./MenuTransitions";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase";

export default function Header() {
    const userId = JSON.parse(localStorage.getItem('user_logged')) || false;
    const [user, setUser] = useState(null);
    const ref = doc(db, "users", userId);

    const processData = async () => {
        await getUserData();
    }

    const getUserData = async () => {
        const dataUser = await getDoc(ref);
        const responseUser = {...dataUser.data()};
        setUser(responseUser);
    }
    useEffect(() => {
        processData();
    }, [])

    
    return (
        <div>
            <AppBar position="static">
                <Toolbar className='bg-[#0C3B2E]'>
                    <MenuTransitions user={user} setUser={setUser}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}