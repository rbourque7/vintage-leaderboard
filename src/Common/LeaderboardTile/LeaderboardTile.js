import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import {
    Box, Typography
} from "@mui/material";

const LeaderboardTile = () => {

    const tileStyle = {
        width: "100%",
        height: "2rem",
        borderRadius: "10px",
        background: "#493E37"
    }



    return (
        <Box sx={tileStyle}>

        </Box>
    );
};

export default LeaderboardTile;