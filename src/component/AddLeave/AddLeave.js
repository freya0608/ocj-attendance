import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import moment from 'moment'
import { message } from 'antd';

import { DatePicker } from 'antd';
import {  withStyles, makeStyles } from '@material-ui/core/styles';

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
    input: {
        margin: theme.spacing(1),
        display: 'none',
    },
}));
const CssTextField = withStyles({})(TextField);


export default function AndLeave() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        isPass: false,
        inputLeaveStart:null,
        inputLeaveEnd:null,
        inputReason:''
    });
    function inputLeaveStart (e){
        setValues(oldValues => ({
            ...oldValues,
            inputLeaveStart:e
        }));
    }
    function inputLeaveEnd (e){
        let inputLeaveEnd = e;
        setValues(oldValues => ({
            ...oldValues,
            inputLeaveEnd:inputLeaveEnd,
        }));

    }
    function inputReason (e){
        let inputReason = e.target.value;
        setValues(oldValues => ({
            ...oldValues,
            inputReason:inputReason
        }));
    }
    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    function submitLeave(){
        console.log(values)
        if(!values.inputLeaveStart||!values.inputLeaveEnd){
            message.error('请填写时间',1);
        }else {
            console.log('leave')
            axios.post('/addLeave',{
                isPass:values.isPass,
                inputLeaveStart:values.inputLeaveStart,
                inputLeaveEnd:values.inputLeaveEnd,
                inputReason:values.inputReason,
            }).then((res)=>{
                // console.log('res',res);
                if(res.data.status==200){
                    message.success('提交成功！',1);
                    window.location.reload()
                }else {
                    message.error('提交失败',1);
                }
            })
        }

    }
    return (
        <div>
            <div style={{width:"200px",margin:"20px"}}>
                <DatePicker showTime size="large"  placeholder="选择开始时间" onChange={onChange} onOk={inputLeaveStart} />
            </div>
            <div style={{width:"200px",margin:"20px"}}>
                <DatePicker showTime size="large"  placeholder="选择结束时间" onChange={onChange} onOk={inputLeaveEnd} />
            </div>
            <div style={{marginTop:'30px',width:'33%',marginLeft:'20px',marginBottom:'30px'}}>
                <CssTextField className={classes.margin}
                              style={{width:'60%'}}
                              id="custom-css-standard-input"
                              label="输入请假原因"
                              onChange={inputReason}
                />
            </div>

            <Button variant="contained"
                    color="primary"
                    style={{height:'40px',marginTop:'15px',width:'20%',marginLeft:'20px'}}
                    className={classes.margin}
                    onClick={submitLeave}
            >
                提交请假
            </Button>

        </div>
    );
}
