import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AnaSayfa from "./components/AnaSayfa";
import SiparişSayfası from "./components/SiparişSayfası";
import OnaySayfası from "./components/OnaySayfası";
import './App.css';

const App = () => {
  return (

    <Router>

      <div>

        <Switch>

          <Route exact path="/">
            <AnaSayfa />
          </Route>

          <Route path="/siparis">
            <SiparişSayfası />
          </Route>

          <Route path="/onay">
            <OnaySayfası />
          </Route>

        </Switch>

      </div>

    </Router>
  );
};

export default App;
