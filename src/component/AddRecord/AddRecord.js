import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import moment from 'moment'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 500,
    },
}));


export default function AndRecord() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        isPass: false,
        inputRecordTime:null,
    });

    function inputRecordTime (e){
        let inputRecordTime = e;
        setValues(oldValues => ({
            ...oldValues,
            inputRecordTime:inputRecordTime,
        }));

    }
    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    function submitRecord(){
        axios.post('/addRecord',{
            isPass:values.isPass,
            inputRecordTime:values.inputRecordTime,
        }).then((res)=>{
            // console.log('res',res);
        })
    }
    return (
        <div>
            <div style={{width:"200px",margin:"20px"}}>
                <DatePicker showTime size="large"  placeholder="选择结束时间" onChange={onChange} onOk={inputRecordTime} />
            </div>

            <Button variant="contained"
                    color="primary"
                    style={{height:'40px',marginTop:'15px',width:'20%'}}
                    className={classes.margin}
                    onClick={submitRecord}
            >
                提交补卡
            </Button>

        </div>
    );
}
