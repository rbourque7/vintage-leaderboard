import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import {
    Box, Typography
} from "@mui/material";

const LeaderboardTile = ({ score, users, index }) => {

    const ranking = index + 1

    const tileStyle = {
        display: "flex",
        justifyContent: "space-around",
        padding: "0 1rem",
        width: "calc(100% - 2rem)",
        height: "calc(20% - 1rem)",
        borderRadius: "10px",
        background: "#B19886",
        alignItems: "center",
        mt: "1rem"
    }
    const rankStyle = {
        mr: "1.5rem"
    }
    const nameStyle = {
        mr: "3rem"
    }

    return (
        <Box sx={tileStyle}>
            <Box sx={{ display: "flex" }}>
                <Typography variant="body1" sx={rankStyle} color="#2E2823">
                    {"#" + ranking}
                </Typography>
                <Typography variant="body1" sx={nameStyle} color="#2E2823">
                    {users.find((user) => user.id === score.userId).firstName + " " + users.find((user) => user.id === score.userId).lastName}
                </Typography>
            </Box>
            <Typography variant="body1" sx={rankStyle} color="#2E2823">
                {score.name}
            </Typography>
            <Typography variant="body1" sx={rankStyle} color="#2E2823">
                {score.score}
            </Typography>
        </Box>
    );
};

export default LeaderboardTile;