import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import ReBox from "../../Common/ReBox/ReBox";
import {
    Box, Typography, TextField, Button, Input, MenuItem, Select, OutlinedInput, FormControl, InputLabel, CircularProgress
} from "@mui/material";
import { Timestamp } from '@firebase/firestore';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import useMediaQuery from '@mui/material/useMediaQuery';

const Bookmark = ({ currUser }) => {
    const mobileView = useMediaQuery('(max-width:500px)');
    const containerStyle = {
        width: mobileView ? "auto" : "100%",
        height: mobileView ? "89.25vh" : "91vh",
        display: "flex",
        flexDirection: "column",
        mt: "2rem",
        padding: mobileView ? "0 1rem" : "0 3rem",
    }



    return (
        <Box sx={containerStyle}>

        </Box>
    );
};

export default Bookmark