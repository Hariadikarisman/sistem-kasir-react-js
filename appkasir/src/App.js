import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbarcomp from './component/Navbarcomp';
import Home from './pages/Home';
import Sukses from './pages/Sukses';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbarcomp />
        <main>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/sukses" component={Sukses} exact/>
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;