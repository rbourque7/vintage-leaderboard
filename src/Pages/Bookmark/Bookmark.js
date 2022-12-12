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

const Bookmark = ({ currUser, games, setPageState }) => {
    const mobileView = useMediaQuery('(max-width:500px)');
    const [gamesList, setGamesList] = useState(games)
    const containerStyle = {
        width: mobileView ? "auto" : "100%",
        height: mobileView ? "89.25vh" : "91vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "2rem",
        padding: mobileView ? "0 1rem" : "0 3rem",
    }
    const gamesBoxStyle = {
        width: "30%",
        padding: "2rem",
        background: "#726256",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "10px",
        boxShadow: "0px 2px 3px 1px #2E2823",
    }
    const bookmarkBoxesStyle = {
        mt: "1rem",
        display: "flex",
        width: "100%",
        justifyContent: "space-around"
    }
    const topBox = {
        display: "flex",
        justifyContent: "flex-start",
        mb: "2rem"
    }
    const buttonStyle = {
        padding: "0.5 2rem"
    }
    const gameBoxArea = {
        width: "100%",
        pt: "1rem",
        height: "25rem"
    }
    const boardStyle = {
        width: "100%",
        height: "25rem",
        background: "#B19886"
    }
    const gameTileStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        borderRadius: "4px",
        boxShadow: "0px 2px 3px 1px #2E2823",
        background: "#2E2823",
        height: "2.5rem",
        borderBottom: "1px solid #726256"
    }
    const logoStyle = {
        width: "1.5rem",
        height: "1.5rem",
    }

    const backToHome = () => {
        setPageState("main")
    }
    const addBoookmarkGame = () => {

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
            <Typography variant="h4" color="#2E2823" sx={{ fontWeight: 500 }}>
                Bookmark Games
            </Typography>
            <Box sx={bookmarkBoxesStyle}>
                <Box sx={gamesBoxStyle}>
                    <Typography variant="h4" sx={{ fontWeight: 500, fontSize: "1.5rem" }} color="#2E2823">
                        Select a game to bookmark
                    </Typography>
                    <Box sx={gameBoxArea}>
                        <Box sx={boardStyle}>
                            {
                                gamesList.map((game) => (
                                    <Box sx={gameTileStyle}>
                                        <Button sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }} onClick={() => addBoookmarkGame(game)}>
                                            <Box sx={{ ml: "2rem", display: "flex", alignItems: "center" }}>
                                                <img
                                                    alt="star"
                                                    src="./Images/starVL.png"
                                                    style={logoStyle}
                                                />
                                            </Box>
                                            <Typography variant="body1" color="#B19886" sx={{ fontWeight: 500, ml: "1rem", mt: "0.25rem" }}>
                                                {game.name}
                                            </Typography>
                                        </Button>
                                    </Box>
                                ))
                            }
                        </Box>
                    </Box>
                </Box>
                <Box sx={gamesBoxStyle}>
                    <Typography variant="h4" sx={{ fontWeight: 500, fontSize: "1.5rem" }} color="#2E2823">
                        Your bookmarked games
                    </Typography>
                    <Box sx={gameBoxArea}>
                        <Box sx={boardStyle}>

                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Bookmark