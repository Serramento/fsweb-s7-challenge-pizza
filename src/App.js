import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AnaSayfa from "./components/AnaSayfa";
import SiparisSayfasi from "./components/SiparisSayfasi";
import OnaySayfasi from "./components/OnaySayfasi";
import "./App.css";

const App = () => {
  const [forms, setForms] = useState([]);

  function handleFormSubmit(yeniForm) {
    setForms([yeniForm, ...forms]);
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <AnaSayfa />
          </Route>

          <Route path="/siparis">
            <SiparisSayfasi submitFn={handleFormSubmit} />
          </Route>

          <Route path="/onay">
            <OnaySayfasi />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
