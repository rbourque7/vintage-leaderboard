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

const EnterScore = ({ currUser, setPageState, games, scores }) => {
    const mobileView = useMediaQuery('(max-width:500px)');
    const [game, setGame] = useState()
    const [score, setScore] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [showMsg, setShowMsg] = useState(false)
    const [isError, setIsError] = useState(false)
    const scoresCollectionRef = collection(db, "scoresList")
    const containerStyle = {
        width: mobileView ? "auto" : "100%",
        height: "91vh",
        display: "flex",
        flexDirection: "column",
        mt: "2rem",
        padding: mobileView ? "0 1rem" : "0 3rem",
    }
    const topBox = {
        display: "flex",
        justifyContent: "flex-start",
        mb: "2rem"
    }
    const bottomBox = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    }
    const submitFormStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: mobileView ? "80%" : "40%",
        background: "#726256",
        boxShadow: "0px 2px 3px 1px #2E2823",
        padding: "2rem",
        mb: "2rem",
        height: "18rem"
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
    }
    const buttonStyle = {
        padding: "0.5 2rem"
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
            setShowMsg(false)
            setIsLoading(true)
            let userScores = scores.filter((score) => score.userId === currUser.id)
            let isScoreExist = userScores.find((score) => score.gameId === game.id)
            if (isScoreExist) {
                const userDoc = doc(db, "scoresList", isScoreExist.id)
                const newFields = { score: score, date: Timestamp.fromDate(new Date()) }
                try {
                    await updateDoc(userDoc, newFields)
                    setIsError(false)
                    setGame("")
                    setScore("")
                } catch {
                    setIsError(true)
                }
                setShowMsg(true)
                setIsLoading(false)
            }
            else {
                try {
                    await addDoc(scoresCollectionRef, { date: Timestamp.fromDate(new Date()), gameId: game.id, name: game.name, userId: currUser.id, score: score })
                    setIsError(false)
                    setGame("")
                    setScore("")
                } catch {
                    setIsError(true)
                }
                setShowMsg(true)
                setIsLoading(false)
            }
        }
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
            <Box sx={bottomBox}>
                <ReBox style={submitFormStyle}>
                    {!isLoading ?
                        <>
                            <Typography variant="h2" color="#2E2823" sx={{ fontWeight: 500, fontSize: "2rem" }}>
                                Enter your score information
                            </Typography>
                            <FormControl sx={{ m: 1, width: mobileView ? 250 : 500 }}>
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
                            <FormControl sx={{ m: 1, width: mobileView ? 250 : 500 }}>
                                <Input sx={inputStyle} value={score} onChange={handleScoreChange} placeholder="Your Score" />
                            </FormControl>
                            <Button variant="contained" sx={submitBtnStyle} onClick={() => submitScore()}>
                                <Typography variant="body1" color="#FFF" sx={{ fontWeight: 500 }}>
                                    Submit Score
                                </Typography>
                            </Button>
                        </> :
                        <CircularProgress />
                    }

                </ReBox>
                {showMsg &&
                    <Box sx={confirmBoxStyle}>
                        <Typography variant="body1" color="#2E2823" sx={{ fontWeight: 500 }}>
                            {isError ? "An error has occured" : "Score Submitted!"}
                        </Typography>
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default EnterScore