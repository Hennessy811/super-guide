import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useMedia } from 'react-use';
import Home from './pages/Home';
import Payments from './pages/Payments';
import Requests from './pages/Requests';

function App() {
  const prefersDarkMode = useMedia('(prefers-color-scheme: dark)');

  useEffect(() => {
    if (prefersDarkMode) {
      document.body.style.backgroundColor = 'rgba(24, 24, 27,1)';
      document.body.style.color = 'white';
    }
  }, [prefersDarkMode]);

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
    </BrowserRouter>
  );
}

export default App;
