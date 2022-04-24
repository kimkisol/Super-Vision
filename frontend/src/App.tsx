
import React from 'react';
import Router from './Router/router'

// import ThemeConfig from './theme/Index'
import GlobalStyles from './theme/GlobalStyles'
import { ThemeProvider } from '@material-ui/core/styles';
import CustomTheme from './theme/CustomTheme'

function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <GlobalStyles/>
      <Router />
    </ThemeProvider>
  );
}

export default App;
