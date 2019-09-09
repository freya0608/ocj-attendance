import React, {Component} from 'react';
import Tabbar from "../component/Tabbar";
import AndLeave from "../component/AddLeave/AddLeave";
import LeaveList from "../component/LeaveList/LeaveList";


class Leave extends Component {
    render() {
        return (
            <div>
                <AndLeave/>
                <LeaveList/>

            </div>
        );
    }
}

export default Tabbar(Leave);
