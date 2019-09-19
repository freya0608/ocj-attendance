import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import moment from 'moment'
import { message } from 'antd';

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


export default function AndLeave() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        isPass: false,
        inputLeaveStart:null,   //双活动
        inputLeaveEnd:null,   //双活动
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
            }).then((res)=>{
                // console.log('res',res);
                if(res.data.status==200){
                    message.success('提交成功！',1);
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

            <Button variant="contained"
                    color="primary"
                    style={{height:'40px',marginTop:'15px',width:'20%'}}
                    className={classes.margin}
                    onClick={submitLeave}
            >
                提交请假
            </Button>

        </div>
    );
}
