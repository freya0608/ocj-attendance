import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { message } from 'antd';

import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from "../AddDuty/AddDuty";
const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 500,
    }
}));


export default function AndFee() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        inputFeeStart:null,
        inputFeeEnd:null
    });
    function inputFeeStart (e){
        setValues(oldValues => ({
            ...oldValues,
            inputFeeStart:e
        }));
    }
    function inputFeeEnd (e){
        setValues(oldValues => ({
            ...oldValues,
            inputFeeEnd:e
        }));
    }
    function submitFee(){
        axios.post('/addFee',{
            inputFeeStart:values.inputFeeStart,
            inputFeeEnd:values.inputFeeEnd,
        }).then((res)=>{
            // console.log('res',res);
            message.success('提交成功！',1);

        })
    }
    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    return (

        <div>
            <div style={{width:"200px",margin:"20px"}}>
                <DatePicker showTime size="large"  placeholder="选择开始时间" onChange={onChange} onOk={inputFeeStart} />
            </div>
            <div style={{width:"200px",margin:"20px"}}>
                <DatePicker showTime size="large"  placeholder="选择结束时间" onChange={onChange} onOk={inputFeeEnd} />
            </div>

            <Button variant="contained"
                    color="primary"
                    style={{height:'40px',marginTop:'15px',width:'20%'}}
                    className={classes.margin}
                    onClick={submitFee}
            >
                提交加班费
            </Button>

        </div>

    );
}




