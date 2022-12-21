import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import ReBox from "../../Common/ReBox/ReBox";
import {
    Box, Typography, TextField, Button, Input, MenuItem, Select, OutlinedInput, FormControl, InputLabel, CircularProgress
} from "@mui/material";
import { FieldValue, Timestamp } from '@firebase/firestore';
import { collection, getDocs, addDoc, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import useMediaQuery from '@mui/material/useMediaQuery';

const Recent = ({ currUser, games, setPageState }) => {
    const mobileView = useMediaQuery('(max-width:500px)');
    const [gamesList, setGamesList] = useState(games)
    const [userGamesList, setUserGamesList] = useState([])
    const [tempBookmarked, setTempBookmarked] = useState([])
    const [exists, setExists] = useState(false)


    const bookmarkCollectionRef = collection(db, "bookmarkList")
    const containerStyle = {
        width: mobileView ? "auto" : "100%",
        height: mobileView ? "89.25vh" : "91vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "2rem",
        padding: mobileView ? "0 1rem" : "0 3rem",
    }


    return (
        <Box sx={containerStyle}>

        </Box>
    );
};
export default Recent