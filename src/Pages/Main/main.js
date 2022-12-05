import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import {
    Box, Typography
} from "@mui/material";
import GamesDDL from "../../Common/GamesDDL/GamesDDL";

const Main = ({ currUser, games }) => {

    const [currGame, setCurrGame] = useState(games[0])
    const containerStyle = {
        width: "100%",
        height: "91vh",
    }

    return (
        <Box sx={containerStyle}>
            <Typography variant="h4" color="#2E2823">
                Leaderboard Area For
            </Typography>
            <Typography variant="body1" color="#2E2823">
                {currGame.name}
            </Typography>
            <GamesDDL games={games} currGame={currGame} setCurrGame={setCurrGame} />
        </Box>
    );
};

export default Main;
