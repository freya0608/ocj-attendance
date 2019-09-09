import React, {Component} from 'react';
import Tabbar from "../component/Tabbar";
import AndFee from "../component/AddFee/AddFee";
import FeeList from "../component/FeeList/FeeList";


class Fee extends Component {
    render() {
        return (
            <div>
               <AndFee/>
               <FeeList/>

            </div>
        );
    }
}

export default Tabbar(Fee);
