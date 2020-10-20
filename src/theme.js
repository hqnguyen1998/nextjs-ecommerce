import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: {
    fontSize: 12,
    fontFamily: 'Roboto Condensed, sans-serif',
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontSize: 12,
    fontFamily: 'Roboto Condensed, sans-serif',
  },
});

export const responsiveLightTheme = responsiveFontSizes(lightTheme);
export const responsiveDarkTheme = responsiveFontSizes(darkTheme);
