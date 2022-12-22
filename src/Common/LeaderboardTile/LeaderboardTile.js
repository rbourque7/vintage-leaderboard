import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import {
    Box, Typography
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

const LeaderboardTile = ({ score, users, index, currUser }) => {
    let monthsNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    const scoreDate = new Date(score.date.seconds * 1000)
    const year = scoreDate.getFullYear();
    const monthNum = scoreDate.getMonth();
    const day = scoreDate.getDate();
    const mobileView = useMediaQuery('(max-width:500px)');
    const ranking = index + 1
    const tileStyle = {
        display: "flex",
        justifyContent: "space-between",
        padding: "0 1rem",
        width: "calc(100% - 2rem)",
        height: "calc(20% - 1rem)",
        borderRadius: "10px",
        background: score.userId === currUser.id ? "linear-gradient(313deg, rgba(238,214,197,1) 17%, rgba(226,189,163,1) 100%);" : "#B19886",
        alignItems: "center",
        mt: "1rem",
        boxShadow: "0px 2px 3px 1px #2E2823",
    }
    const rankStyle = {
        m: mobileView ? "0 1rem 0 0.66rem" : "0 1.5rem 0 1rem",
        fontWeight: 700
    }
    const rankStyleN = {
        fontSize: "0.8rem",
        width: "5rem",
        m: mobileView ? "0 1rem 0 0" : "0 1.5rem 0 1rem",
        fontWeight: 700
    }
    const nameStyle = {
        mr: mobileView ? index === "none" ? "0.75rem" : "2rem" : "3rem"
    }
    const gNameStyle = {
        mr: mobileView ? "1rem" : "1.5rem"
    }
    const scoreStyle = {
        m: mobileView ? "0 1rem 0 0.33rem" : "0 1.5rem 0 1rem",
        fontWeight: 500
    }

    return (
        <Box sx={tileStyle}>
            <Box sx={{ display: "flex", alignItems: "center", height: "3rem" }}>
                {index === "none" ?
                    <Typography variant="body1" sx={rankStyleN} color="#2E2823">
                        {score.name}
                    </Typography>
                    :
                    <Typography variant="body1" sx={rankStyle} color="#2E2823">
                        {"#" + ranking}
                    </Typography>
                }
                <Typography variant="body1" sx={nameStyle} color="#2E2823">
                    {mobileView ? users.find((user) => user.id === score.userId).firstName : users.find((user) => user.id === score.userId).firstName + " " + users.find((user) => user.id === score.userId).lastName}
                </Typography>
            </Box>
            <Typography variant="body1" sx={scoreStyle} color="#2E2823">
                {score.score}
            </Typography>
            <Typography variant="body1" sx={scoreStyle} color="#2E2823">
                {monthsNames[monthNum]} {day} {index !== "none" && year}
            </Typography>
        </Box>
    );
};

export default LeaderboardTile;