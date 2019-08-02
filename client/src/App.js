import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MailForm from './pages/Mail';

class App extends Component {
  render() {
    return (
      // <div className="App">
      //     <MailForm />
      // </div>
      <Router>
      {/* <Navbar /> */}
        <Switch>
        <Route exact path="/" component={MailForm} />
        {/* <Route exact path="/signup" component={Signup} />
        <Route exact path="/members" component={Members} /> */}
        </Switch>
    </Router>
    );
  }
}

export default App;
