import React, {Component} from 'react';
import Tabbar from "../component/Tabbar";
import AndRecord from "../component/AddRecord/AddRecord";
import RecordList from "../component/RecordList/RecordList";


class Record extends Component {
    render() {
        return (
            <div>
                <AndRecord/>
                <RecordList/>

            </div>
        );
    }
}

export default Tabbar(Record);
