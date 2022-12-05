import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import {
    Box, Typography, TextField, Button
} from "@mui/material";

const Login = ({ setEmail }) => {
    const [currEmailVal, setCurrEmailVal] = useState("")
    const [currPassVal, setCurrPassVal] = useState("")

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "inherit",
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
    const loginBtnStyle = {
        background: "#493E37",
        "&:hover": {
            background: "#726256",
        }
    }

    const attemptLogin = () => {
        const checkCreds = async () => {
            try {
                const user = await signInWithEmailAndPassword(
                    auth,
                    currEmailVal,
                    currPassVal
                );
                user && setEmail(user.user.email)
                resetFields()
            } catch (error) {
                console.log(error, "There is no user with this email or password");
                resetFields()
            }
        }
        if (currEmailVal && currPassVal) {
            checkCreds()
        } else { console.log("Please enter login information") }
    }

    const resetFields = () => {
        setCurrEmailVal("")
        setCurrPassVal("")
    }

    return (
        <Box sx={containerStyle}>
            <Typography>
                Login
            </Typography>
            <Box sx={inputAreaStyle}>
                <TextField
                    value={currEmailVal}
                    sx={textFieldStyle}
                    placeholder="Required"
                    label="Email"
                    variant="filled"
                    size="small"
                    onChange={(e) => setCurrEmailVal(e.target.value)}
                />
                <TextField
                    value={currPassVal}
                    sx={textFieldStyle}
                    placeholder="Required"
                    label="Password"
                    variant="filled"
                    size="small"
                    onChange={(e) => setCurrPassVal(e.target.value)}
                />
                <Button variant="contained" sx={loginBtnStyle} onClick={() => attemptLogin()}>Login</Button>
            </Box>
        </Box>
    );
};

export default Login