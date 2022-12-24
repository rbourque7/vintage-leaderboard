import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import {
    Box, Typography, MenuItem, Select, OutlinedInput, FormControl, InputLabel, Autocomplete, TextField
} from "@mui/material";

const GamesDDL = ({ games, currGame, setCurrGame, placeholder }) => {
    const filtGames = [{ id: 0, name: "Choose a Game" }, ...games]

    const autoStyle = {
        mt: "1rem",
        mb: "1rem",
        background: "#8E7A6B",
        width: 250,
        color: "#2E2823",
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2E2823",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "2E2823",
        },
        "&.Mui-focused .MuiInputLabel-root": {
            color: "#2E2823",
        },
    }

    const handleGameChange = (e, value) => {
        let game = filtGames.find((game) => game.name === value.name)
        setCurrGame(game)
    }

    useEffect(() => {
        setCurrGame(filtGames[0])
    }, [])

    return (
        <Autocomplete
            sx={autoStyle}
            disableClearable={true}
            options={filtGames}
            value={currGame.name}
            disablePortal
            defaultValue={placeholder}
            onChange={handleGameChange}
            autoHighlight
            getOptionLabel={(option) => option.name || currGame.name}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    sx={{ "& > img": { mr: 1, flexShrink: 0 } }}
                    {...props}
                    key={option.id}
                >
                    {option.name}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={placeholder}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                    }}
                />
            )}
            ListboxProps={{
                style: {
                    background: "#8E7A6B",
                    maxHeight: "11rem",
                    color: "#2E2823",
                },
            }}
        />
    );
};

export default GamesDDL;