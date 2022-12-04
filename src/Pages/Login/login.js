import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import {
    Box, Typography, TextField, Button
} from "@mui/material";

const Login = ({ setEmail }) => {
    const [currEmailVal, setCurrEmailVal] = useState()
    const [currPassVal, setCurrPassVal] = useState()

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "91vh",
    }
    const textFieldStyle = {
        mb: "1rem"
    }
    const inputAreaStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "20%",
    }

    const attemptLogin = () => {
        const checkCreds = async () => {
            try {
                const user = await signInWithEmailAndPassword(
                    auth,
                    currEmailVal,
                    currPassVal
                );
                console.log(user.user.email)
                user && setEmail(user.user.email)
            } catch (error) {
                console.log(error, "There is no user with this email or password");
            }
        }
        if (currEmailVal && currPassVal) {
            checkCreds()
        } else { console.log("Please enter login information") }
    }

    return (
        <Box sx={containerStyle}>
            <Typography>
                Login
            </Typography>
            <Box sx={inputAreaStyle}>
                <TextField
                    sx={textFieldStyle}
                    placeholder="Required"
                    label="Email"
                    defaultValue=""
                    variant="filled"
                    size="small"
                    onChange={(e) => setCurrEmailVal(e.target.value)}
                />
                <TextField
                    sx={textFieldStyle}
                    placeholder="Required"
                    label="Password"
                    defaultValue=""
                    variant="filled"
                    size="small"
                    onChange={(e) => setCurrPassVal(e.target.value)}
                />
                <Button variant="contained" onClick={() => attemptLogin()}>Login</Button>
            </Box>
        </Box>
    );
};

export default Login