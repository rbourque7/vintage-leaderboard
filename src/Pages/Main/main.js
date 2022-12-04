import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import {
    Box, Typography
} from "@mui/material";

const Main = () => {

    const containerStyle = {
        width: "100%",
        height: "91vh",
    }



    return (
        <Box sx={containerStyle}>
            <Typography>
                Main
            </Typography>
        </Box>
    );
};

export default Main;
