import { createTheme } from "@mui/material/styles";

const getCustomMuiTheme = () => {
  const customTheme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "Montserrat",
            fontSize: "1rem",
            fontWeight: "bolder",
            background: "#493E37"
          },
        },
      },
    },
    palette: {
      type: "light",
      primary: {
        main: "#2E117F",
      },
      secondary: {
        main: "#C31CF3",
      },
      info: {
        main: "#207DF9",
      },
      success: {
        main: "#0A6C0A",
      },
      //COLOR WAVE
      //light #B19886
      //medium #8E7A6B
      //dark #726256
      //darkest #493E37
      //darkness #2E2823
    },
    typography: {
      fontFamily: "Montserrat",
      body1: {
        fontFamily: "Karla",
      },
      body2: {
        color: "rgba(46, 17, 126, 0.4)",
        fontFamily: "Karla",
        fontSize: "1.2rem",
      },
      h1: {
        fontSize: "1.75rem",
        fontWeight: 950,
        marginBottom: "1rem",
      },
      h2: {
        fontSize: "1.5rem",
        fontWeight: 950,
        marginBottom: "1rem",
      },
      h3: {
        fontSize: "1.25rem",
        fontWeight: 500,
      },
      subtitle1: {
        color: "#2E117F",
        fontFamily: "Montserrat",
        fontSize: "1rem",
        fontWeight: 500,
      },
    },
  });

  return customTheme;
};

export default getCustomMuiTheme;
