import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Payments from './pages/Payments';
import Requests from './pages/Requests';

function App() {
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
