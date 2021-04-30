import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useMedia } from 'react-use';
import Home from './pages/Home';
import Layout from './shared/components/Layout';

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
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
