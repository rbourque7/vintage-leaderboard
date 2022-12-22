import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import ReBox from "../../Common/ReBox/ReBox";
import {
    Box, Typography, TextField, Button, Input, MenuItem, Select, OutlinedInput, FormControl, InputLabel, CircularProgress
} from "@mui/material";
import { FieldValue, Timestamp } from '@firebase/firestore';
import { collection, getDocs, addDoc, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import LeaderboardTile from "../../Common/LeaderboardTile/LeaderboardTile";
import AddIcon from '@mui/icons-material/Add';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import useMediaQuery from '@mui/material/useMediaQuery';

const Admin = ({ currUser, setPageState, games, users }) => {
    const mobileView = useMediaQuery('(max-width:500px)');
    const [selectionState, setSelectionState] = useState(0)
    const [gameName, setGameName] = useState()
    const containerStyle = {
        width: mobileView ? "auto" : "100%",
        height: mobileView ? "89.25vh" : "91vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "2rem",
        padding: mobileView ? "0 1rem" : "0 3rem",
    }
    const topBox = {
        display: "flex",
        justifyContent: "flex-start",
        mb: "2rem"
    }
    const buttonStyle = {
        padding: "0.5 2rem",

    }
    const mainArea = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    }
    const btnArea = {
        display: "flex",
        justifyContent: "space-around",
    }
    const iconStyle = {
        fontSize: "4rem",
    }
    const btnStyle = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "0",
        background: "transparent",
        boxShadow: "none",
        width: "40%",
        height: "100%",
        color: "#2E2823",
        '&:hover': {
            backgroundColor: '#2E2823',
            color: '#8E7A6B',
            transition: "background 0.45s",
        }
    }
    const formAreaStyle = {
        display: "flex",
        justifyContent: "center",
        mt: "2rem",
        width: "100%"
    }
    const gameFormStyle = {
        textAlign: "center",
        width: mobileView ? "90%" : "55%",
        padding: "0 1rem 1.5rem 1rem",
        background: "#726256",
        mt: mobileView ? "0.5rem" : "1rem",
        boxShadow: "0px 2px 3px 1px #2E2823",
        height: mobileView ? "28rem" : "80%",
    }
    const inputStyle = {
        mt: "1rem",
        "&.MuiInputBase-root::after": {
            borderBottom: "2px solid #B19886"
        }
    }

    const handleNameChange = (event) => {
        const {
            target: { value },
        } = event;
        setGameName(value)
    }

    const backToHome = () => {
        setPageState("main")
    }

    const handleAddGameClick = () => {
        setSelectionState(1)
    }

    const handleAddUserClick = () => {
        setSelectionState(2)
    }

    return (
        <Box sx={containerStyle}>
            <Box sx={topBox}>
                <Button onClick={() => backToHome()} sx={buttonStyle}>
                    <Typography variant="body1" color="#2E2823">
                        Go Back
                    </Typography>
                </Button>
            </Box>
            <Box sx={mainArea}>
                <Box sx={btnArea}>
                    <ReBox style={btnStyle} button={true} clickHandler={() => handleAddGameClick()}>
                        <AddIcon fontSize="large" sx={iconStyle} />
                        <Typography variant="body1">
                            Add a Game
                        </Typography>
                    </ReBox>
                    <ReBox style={btnStyle} button={true} clickHandler={() => handleAddUserClick()}>
                        <PersonAddAltIcon fontSize="large" sx={iconStyle} />
                        <Typography variant="body1">
                            Add a User
                        </Typography>
                    </ReBox>
                </Box>
                <Box sx={formAreaStyle}>
                    {selectionState === 0 &&
                        <Typography variant="h4" sx={{ fontSize: mobileView ? "1.25rem" : "1.75rem", fontWeight: 500 }}>
                            Please select an action...
                        </Typography>
                    }
                    {selectionState === 1 &&
                        <Box sx={gameFormStyle}>
                            <Typography variant="h4" sx={{ fontSize: mobileView ? "1.25rem" : "1.75rem", fontWeight: 500, mt: "1rem" }}>
                                Add a game
                            </Typography>
                            <FormControl sx={{ m: 1, width: mobileView ? 250 : 500 }}>
                                <Input sx={inputStyle} value={gameName} onChange={handleNameChange} placeholder="Game Name" />
                            </FormControl>
                        </Box>
                    }
                    {selectionState === 2 &&
                        <Typography variant="h4" sx={{ fontSize: mobileView ? "1.25rem" : "1.75rem", fontWeight: 500 }}>
                            Please select an action...
                        </Typography>
                    }
                </Box>
            </Box>
        </Box>
    );
};
export default Admin