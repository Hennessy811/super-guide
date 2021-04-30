import { Button, Container, createMuiTheme, ThemeProvider, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Payments from './pages/Payments';
import Requests from './pages/Requests';
import Layout from './shared/components/Layout';
import Notifications from './shared/components/Notifications';
import useTheme from './shared/hooks/useTheme';

const baseTheme = createMuiTheme();

function App() {
  // const { theme: prefferedTheme } = useTheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <BrowserRouter>
      {/* <Layout> */}
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/pay" exact>
          <Payments />
        </Route>
        <Route path="/requests" exact>
          <Requests />
        </Route>
      </Switch>
      {/* </Layout> */}
      <Notifications />
    </BrowserRouter>
  );
}

export default App;
