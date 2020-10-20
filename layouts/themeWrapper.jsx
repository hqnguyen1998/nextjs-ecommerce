import React from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { responsiveDarkTheme, responsiveLightTheme } from '../src/theme';

const ThemeWrapper = ({ children }) => {
  const lightTheme = useSelector((state) => state.theme.lightTheme);

  return (
    <ThemeProvider
      theme={lightTheme ? responsiveLightTheme : responsiveDarkTheme}
    >
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
