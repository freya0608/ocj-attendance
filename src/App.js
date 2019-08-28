import './App.css';
import React, {Component} from 'react';
import { HashRouter as Router, Route,Switch } from "react-router-dom";
import Index from './component/Index/Index';
import Page404 from './component/page404/Page404';
import Login from "./component/Login/Login";

class App extends Component {
  render() {
    return (
        <div>
          <Router>
            <Switch>
                <Route exact path={`/`} component={Login}/>
                <Route exact path={`/index`} component={Index}/>
                {/*<Route exact path={`/fee`} component={Fee}/>*/}
                {/*<Route exact path={`/duty`} component={Duty}/>*/}
                <Route component={Page404}/>
            </Switch>
          </Router>


        </div>

    );
  }
}

export default App;



