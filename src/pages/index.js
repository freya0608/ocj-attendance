import React, {Component} from 'react';
import Tabbar from "../component/Tabbar";
import UserInfo from "../component/UserInfo/UserInfo";


class Index extends Component {
    render() {
        return (
            <div>
                <UserInfo/>
            </div>
        );
    }
}

export default Tabbar(Index);
