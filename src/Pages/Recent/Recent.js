import React, { useState, useEffect } from "react";
import ReBox from "../../Common/ReBox/ReBox";
import {
    Box, Typography, Button, CircularProgress
} from "@mui/material";
import LeaderboardTile from "../../Common/LeaderboardTile/LeaderboardTile";
import useMediaQuery from '@mui/material/useMediaQuery';

const Recent = ({ currUser, scores, users, setPageState }) => {
    const mobileView = useMediaQuery('(max-width:500px)');

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
        padding: "0.5 2rem"
    }
    const mainAreaStyle = {
        width: "100%",
        display: "flex"
    }
    const leaderboarAreaStyle = {
        width: "100%",
        mt: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
    const leaderboardStyle = {
        textAlign: "center",
        width: mobileView ? "90%" : "55%",
        padding: "0 1rem 1.5rem 1rem",
        background: "#726256",
        mt: mobileView ? "0.5rem" : "1rem",
        boxShadow: "0px 2px 3px 1px #2E2823",
        height: mobileView ? "28rem" : "80%",
    }

    const tileAreaStyle = {
        height: mobileView ? "25rem" : "82%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "10px",
        mb: mobileView && "2rem",
        overflowX: "hidden",
        overflowY: "scroll",
        padding: "0 0.5rem 0 0",
        "&::-webkit-scrollbar": {
            width: "10px",
            border: "1px solid #2E2823",
            borderRadius: "5px",
            background: "#493E37"
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: "5px",
            background: "#2E2823"
        }
    }

    const backToHome = () => {
        setPageState("main")
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
            <Box sx={mainAreaStyle}>
                <Box sx={leaderboarAreaStyle}>
                    <ReBox style={leaderboardStyle}>
                        <Typography variant="h4" color="#2E2823" sx={{ fontSize: "1.25rem", fontWeight: 500, mt: "1rem" }}>
                            Recent Scores
                        </Typography>
                        <Box sx={tileAreaStyle}>
                            {scores.map((score) => (
                                <LeaderboardTile score={score} users={users} index="none" currUser={currUser} />
                            ))}
                        </Box>
                    </ReBox>
                </Box>
            </Box>
        </Box>
    );
};
export default Recent