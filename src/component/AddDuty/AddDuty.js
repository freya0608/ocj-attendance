import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import moment from 'moment'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { message } from 'antd';

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


export default function AndDuty() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        isPass: false,
        inputDutyStart:null,   //双活动
        inputDutyEnd:null,   //双活动
    });
    function inputDutyStart (e){
        setValues(oldValues => ({
            ...oldValues,
            inputDutyStart:e
        }));
    }
    function inputDutyEnd (e){
        let inputDutyEnd = e;
        setValues(oldValues => ({
            ...oldValues,
            inputDutyEnd:inputDutyEnd,
        }));

    }
    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    function submitDuty(){
        axios.post('/addDuty',{
            isPass:values.isPass,
            inputDutyStart:values.inputDutyStart,
            inputDutyEnd:values.inputDutyEnd,
        }).then((res)=>{
            // console.log('res',res);
            message.success('提交成功！',1);

        })
    }
    return (
        <div>
            <div style={{width:"200px",margin:"20px"}}>
                <DatePicker showTime size="large"  placeholder="选择开始时间" onChange={onChange} onOk={inputDutyStart} />
            </div>
            <div style={{width:"200px",margin:"20px"}}>
                <DatePicker showTime size="large"  placeholder="选择结束时间" onChange={onChange} onOk={inputDutyEnd} />
            </div>

            <Button variant="contained"
                    color="primary"
                    style={{height:'40px',marginTop:'15px',width:'20%'}}
                    className={classes.margin}
                    onClick={submitDuty}
            >
                提交值班
            </Button>

        </div>
    );
}
