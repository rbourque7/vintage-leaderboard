import { Box, Button } from "@mui/material";

const ReBox = ({ children, disabled, style, button, clickHandler }) => {
    const containerStyle = {
        position: "relative",
        padding: "3%",
        borderRadius: "0.5rem",
        background:
            "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(244,242,248,1) 100%)",
        boxShadow: "0px 2px 3px 1px #dad8e8",
        opacity: disabled ? "50%" : "100%",
    };
    const buttonStyle = {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        borderRadius: "inherit",
    };

    return (
        <Box sx={{ ...containerStyle, ...style }}>
            {button && <Button sx={buttonStyle} onClick={clickHandler} />}
            {children}
        </Box>
    );
};

export default ReBox;
