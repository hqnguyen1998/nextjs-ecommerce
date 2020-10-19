import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontSize: 12,
    fontFamily: 'Roboto Condensed, sans-serif',
  },
});

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
