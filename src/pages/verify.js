import React, {Component} from 'react';
import Tabbar from "../component/Tabbar";
import VerifyList from "../component/VerifyList/VerifyList";


class Leave extends Component {
    render() {
        return (
            <div>
                <VerifyList/>

            </div>
        );
    }
}

export default Tabbar(Leave);
