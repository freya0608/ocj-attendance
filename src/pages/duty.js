import React, {Component} from 'react';
import Tabbar from "../component/Tabbar";
import AndDuty from "../component/AddDuty/AddDuty";
import DutyList from "../component/DutyList/DutyList";


class Duty extends Component {
    render() {
        return (
            <div>
                <AndDuty/>
                <DutyList/>

            </div>
        );
    }
}

export default Tabbar(Duty);
