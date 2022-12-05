import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import {
    Box, Typography, MenuItem, Select, OutlinedInput, FormControl, InputLabel
} from "@mui/material";

const GamesDDL = ({ games, currGame, setCurrGame }) => {
    const selectStyle = {
        background: "#8E7A6B",
        color: "#2E2823",
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#493E37",
        }
    }
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
                background: "#726256",
                color: "#FFF",
            },
        },
    };
    const labelStyle = {
        "&.Mui-focused": {
            color: "#493E37"
        }
    }

    const handleGameChange = (event) => {
        const {
            target: { value },
        } = event;
        let game = games.find((game) => game.name === value)
        setCurrGame(game)
    }

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="game-ddl-label" sx={labelStyle}>Games</InputLabel>
            <Select
                id="game-ddl-label"
                sx={selectStyle}
                value={currGame.name}
                input={<OutlinedInput label="Games" />}
                onChange={handleGameChange}
                MenuProps={MenuProps}
            >
                {games.map((game) => (
                    <MenuItem
                        key={game.id}
                        value={game.name}
                    >
                        {game.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default GamesDDL;