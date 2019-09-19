import React  from 'react'
// import {BrowserRouter,Route,Switch} from 'react-router-dom'
import { HashRouter as Router, Route,Switch } from "react-router-dom";

import Index from './pages/index';
import Fee from './pages/fee';
import Duty from './pages/duty';
import Leave from './pages/leave';
import Record from './pages/record';
import Arrange from './pages/arrange';
import Verify from './pages/verify';
import Login from './component/Login/Login';


export default ()=>(

    <Router>
        <Switch>
            <Route path='/index' component={Index}></Route>
            <Route path='/leave' component={Leave}></Route>
            <Route path='/fee' component={Fee}></Route>
            <Route path='/duty' component={Duty}></Route>
            <Route path='/record' component={Record}></Route>
            <Route path='/arrange' component={Arrange}></Route>
            <Route path='/verify' component={Verify}></Route>
            <Route path='/login' component={Login}></Route>
        </Switch>

    </Router>
)
