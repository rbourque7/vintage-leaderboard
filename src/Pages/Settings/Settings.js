import React, { useState, useEffect } from "react";
import ReBox from "../../Common/ReBox/ReBox";
import {
    Box, Typography, Button, CircularProgress
} from "@mui/material";
import LeaderboardTile from "../../Common/LeaderboardTile/LeaderboardTile";
import useMediaQuery from '@mui/material/useMediaQuery';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Settings = ({ currUser, setPageState }) => {
    const mobileView = useMediaQuery('(max-width:500px)');

    const [sent, setSent] = useState(false)

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
        flexDirection: "column",
        mb: "2rem"
    }
    const buttonStyle = {
        padding: "0.5 2rem"
    }
    const pButtonStyle = {
        padding: "0.5 2rem",
        mt: "2rem"
    }


    const backToHome = () => {
        setPageState("main")
    }

    const passwordReset = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, currUser.email)
        setSent(true)
    }

    return (
        <Box sx={containerStyle}>
            <Box sx={topBox}>
                <Button onClick={() => backToHome()} sx={buttonStyle}>
                    <Typography variant="body1" color="#2E2823">
                        Go Back
                    </Typography>
                </Button>
                <Typography variant="body1" color="#2E2823">
                    Your Email: {currUser.email}
                </Typography>
                <Button onClick={() => passwordReset()} sx={pButtonStyle}>
                    <Typography variant="body1" color="#2E2823">
                        RESET PASSWORD
                    </Typography>
                </Button>
                {sent &&
                    <Typography variant="h4" color="#2E2823" sx={{ mt: "3rem", fontSize: "1.25rem", fontWeight: 500 }}>
                        PASSWORD RESET SENT
                    </Typography>
                }
            </Box>
        </Box>
    );
};
export default Settings