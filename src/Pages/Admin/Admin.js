import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import ReBox from "../../Common/ReBox/ReBox";
import {
    Box, Typography, TextField, Button, Input, MenuItem, Select, OutlinedInput, FormControl, InputLabel, CircularProgress, appBarClasses
} from "@mui/material";
import { FieldValue, Timestamp } from '@firebase/firestore';
import { collection, getDocs, addDoc, updateDoc, doc, arrayUnion, arrayRemove, createId } from "firebase/firestore";
import LeaderboardTile from "../../Common/LeaderboardTile/LeaderboardTile";
import AddIcon from '@mui/icons-material/Add';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Admin = ({ currUser, setPageState, games, users }) => {
    const mobileView = useMediaQuery('(max-width:500px)');
    const [selectionState, setSelectionState] = useState(0)
    const [error, setError] = useState(0)
    const [confirm, setConfirm] = useState(false)
    const [gameName, setGameName] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [tempPassword, setTempPassword] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const gamesCollectionRef = collection(db, "games")
    const usersCollectionRef = collection(db, "users")
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
        flexDirection: "column",

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
        padding: "0.25rem",
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
        width: "100%",
    }
    const gameFormStyle = {
        textAlign: "center",
        width: mobileView ? "90%" : "55%",
        padding: "0 1rem 1.5rem 1rem",
        background: "#726256",
        mt: mobileView ? "0.5rem" : "1rem",
        boxShadow: "0px 2px 3px 1px #2E2823",
        height: mobileView ? selectionState === 2 ? "26rem" : "15rem" : "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
    const inputStyle = {
        mt: "2rem",
        "&.MuiInputBase-root::after": {
            borderBottom: "2px solid #B19886"
        }
    }
    const submitBtnStyle = {
        opacity: isLoading ? "50%" : "100%",
        height: "2rem",
        mt: "2rem",
        width: mobileView ? 250 : 500,
        fontWeight: 600,
        background: "#493E37",
        "&:hover": {
            background: "#726256",
        }
    }
    const confirmBoxStyle = {
        textAlign: "center",
        width: "40%",
        background: "#726256",
        boxShadow: "0px 2px 3px 1px #2E2823",
        padding: "2rem",
        mt: "2rem",
    }
    const msgBox = {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }

    const handleNameChange = (event) => {
        const {
            target: { value },
        } = event;
        setGameName(value)
    }

    const handlefNameChange = (event) => {
        const {
            target: { value },
        } = event;
        setFirstName(value)
    }

    const handlelNameChange = (event) => {
        const {
            target: { value },
        } = event;
        setLastName(value)
    }

    const handleMailChange = (event) => {
        const {
            target: { value },
        } = event;
        setEmail(value)
    }

    const handleTempPassChange = (event) => {
        const {
            target: { value },
        } = event;
        setTempPassword(value)
    }

    const backToHome = () => {
        setPageState("main")
    }

    const handleAddGameClick = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setError(0)
        setConfirm(false)
        setSelectionState(1)
    }

    const handleAddUserClick = () => {
        setGameName("")
        setError(0)
        setConfirm(false)
        setSelectionState(2)
    }

    const submitGame = async () => {
        if (gameName && !isLoading) {
            setIsLoading(true)
            let isExist = games.find((game) => game.name === gameName)
            if (isExist) {
                setError(2)
            }
            else {
                const res = await addDoc(gamesCollectionRef, { name: gameName })
                const userDoc = doc(db, "games", res.id)
                const newFields = { id: res.id }
                await updateDoc(userDoc, newFields)
                setGameName("")
                setConfirm(true)
            }
            setIsLoading(false)
        }
        else {
            setError(1)
        }
    }

    const submitUser = async () => {
        if (email && firstName && lastName && !isLoading) {
            let isExist = users.find((user) => user.email === email)
            if (isExist) {
                setError(2)
            }
            else {
                const res = await addDoc(usersCollectionRef, { firstName: firstName, lastName: lastName, email: email, isAdmin: false })
                const userDoc = doc(db, "users", res.id)
                const newFields = { id: res.id }
                await updateDoc(userDoc, newFields)
                createAuth()
                setFirstName("")
                setLastName("")
                setEmail("")
                setTempPassword("")
                setConfirm(true)
                setIsLoading(false)
            }
            setIsLoading(true)
        }
        else {
            setError(1)
        }
    }

    const createAuth = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, tempPassword)
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
                                Add a Game
                            </Typography>
                            <FormControl sx={{ m: 1, width: mobileView ? 250 : 500 }}>
                                <Input sx={inputStyle} value={gameName} onChange={handleNameChange} placeholder="Game Name" />
                            </FormControl>
                            <Button variant="contained" sx={submitBtnStyle} onClick={() => submitGame()}>
                                <Typography variant="body1" color="#FFF" sx={{ fontWeight: 500 }}>
                                    Submit Game
                                </Typography>
                            </Button>
                        </Box>
                    }
                    {selectionState === 2 &&
                        <Box sx={gameFormStyle}>
                            <Typography variant="h4" sx={{ fontSize: mobileView ? "1.25rem" : "1.75rem", fontWeight: 500, mt: "1rem" }}>
                                Add a User
                            </Typography>
                            <FormControl sx={{ m: 1, width: mobileView ? 250 : 500 }}>
                                <Input sx={inputStyle} value={firstName} onChange={handlefNameChange} placeholder="First Name" />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: mobileView ? 250 : 500 }}>
                                <Input sx={inputStyle} value={lastName} onChange={handlelNameChange} placeholder="Last Name" />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: mobileView ? 250 : 500 }}>
                                <Input sx={inputStyle} value={email} onChange={handleMailChange} placeholder="Email" />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: mobileView ? 250 : 500 }}>
                                <Input sx={inputStyle} value={tempPassword} onChange={handleTempPassChange} placeholder="Temporary Password" />
                            </FormControl>
                            <Button variant="contained" sx={submitBtnStyle} onClick={() => submitUser()}>
                                <Typography variant="body1" color="#FFF" sx={{ fontWeight: 500 }}>
                                    Submit User
                                </Typography>
                            </Button>
                        </Box>
                    }
                </Box>
                <Box sx={msgBox}>
                    {error === 1 &&
                        <Box sx={confirmBoxStyle}>
                            <Typography variant="body1" color="#2E2823" sx={{ fontWeight: 500 }}>
                                {"Please enter data in the empty field"}
                            </Typography>
                        </Box>
                    }
                    {error === 2 &&
                        <Box sx={confirmBoxStyle}>
                            <Typography variant="body1" color="#2E2823" sx={{ fontWeight: 500 }}>
                                {"That record already exists!"}
                            </Typography>
                        </Box>
                    }
                    {confirm &&
                        <Box sx={confirmBoxStyle}>
                            <Typography variant="body1" color="#2E2823" sx={{ fontWeight: 500 }}>
                                {"Record has been added!"}
                            </Typography>
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    );
};
export default Admin