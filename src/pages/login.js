import React, {Component} from 'react';
import Tabbar from "../component/Tabbar";
import Login  from "../component/Login/Login";


class ToLogin extends Component {
    render() {
        return (
            <div>
                <Login/>

            </div>
        );
    }
}

export default Tabbar(ToLogin);
