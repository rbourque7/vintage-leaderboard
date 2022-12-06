import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import ReBox from "../../Common/ReBox/ReBox";
import {
    Box, Typography, TextField, Button, Input, MenuItem, Select, OutlinedInput, FormControl, InputLabel
} from "@mui/material";
import { collection, addDoc } from "firebase/firestore"

const EnterScore = ({ currUser, setPageState, games }) => {
    const [game, setGame] = useState()
    const [score, setScore] = useState()
    let newDate = new Date()
    const date = newDate.getDate();
    const scoresCollectionRef = collection(db, "scoresList")
    const containerStyle = {
        width: "100%",
        height: "91vh",
        display: "flex",
        flexDirection: "column",
        mt: "2rem",
        padding: "0 3rem",
    }
    const topBox = {
        display: "flex",
        justifyContent: "flex-start",
        mb: "2rem"
    }
    const bottomBox = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    }
    const submitFormStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "40%",
        background: "#726256",
        boxShadow: "0px 2px 3px 1px #2E2823",
        padding: "2rem",
    }
    const selectStyle = {
        mt: "1rem",
        background: "#8E7A6B",
        color: "#2E2823",
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#493E37",
        }
    }
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
                background: "#8E7A6B",
                color: "#2E2823",
            },
        },
    };
    const labelStyle = {
        mt: "1rem",
        "&.Mui-focused": {
            color: "#493E37"
        }
    }
    const inputStyle = {
        mt: "1rem",
        "&.MuiInputBase-root::after": {
            borderBottom: "2px solid #B19886"
        }
    }
    const submitBtnStyle = {
        height: "2rem",
        width: 500,
        fontWeight: 600,
        background: "#493E37",
        "&:hover": {
            background: "#726256",
        }
    }

    const backToHome = () => {
        setPageState("main")
    }

    const handleGameChange = (event) => {
        const {
            target: { value },
        } = event;
        let game = games.find((game) => game.name === value)
        setGame(game)
    }

    const handleScoreChange = (event) => {
        const {
            target: { value },
        } = event;
        setScore(value)
    }

    const submitScore = async () => {
        if (score && game.id) {
            await addDoc(scoresCollectionRef, { date: date, gameId: game.id, name: game.name, userId: currUser.id, score: score })
        }
    }

    return (
        <Box sx={containerStyle}>
            <Box sx={topBox}>
                <Button onClick={() => backToHome()}>
                    <Typography variant="body1" color="#2E2823">
                        Go Back
                    </Typography>
                </Button>
            </Box>
            <Box sx={bottomBox}>
                <ReBox style={submitFormStyle}>
                    <Typography variant="h2" color="#2E2823" sx={{ fontWeight: 500, fontSize: "2rem" }}>
                        Enter your score information
                    </Typography>
                    <FormControl sx={{ m: 1, width: 500 }}>
                        <InputLabel id="game-ddl-label" sx={labelStyle}>Pick the Game</InputLabel>
                        <Select
                            id="game-ddl-label"
                            sx={selectStyle}
                            value={game}
                            input={<OutlinedInput label="Pick the Game" />}
                            onChange={handleGameChange}
                            MenuProps={MenuProps}
                        >
                            {games.map((game) => (
                                <MenuItem
                                    key={game.id}
                                    value={game.name}
                                >
                                    {game.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 500 }}>
                        <Input sx={inputStyle} value={score} onChange={handleScoreChange} placeholder="Your Score" />
                    </FormControl>
                    <Button variant="contained" sx={submitBtnStyle} onClick={() => submitScore()}>
                        <Typography variant="body1" color="#FFF" sx={{ fontWeight: 500 }}>
                            Submit Score
                        </Typography>
                    </Button>
                </ReBox>
            </Box>
        </Box>
    );
};

export default EnterScore