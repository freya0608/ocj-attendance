import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    color:{
        color: "#dc004e"
    }
});

export default function UserInfo() {
    const classes = useStyles();
    const [userInfo,setUserInfo] = useState({feeList:[]});
    useEffect(()=>{
        axios.get('/userInfo').then(res=>{
            // console.log('userInfo',res);
            setUserInfo(oldValues => ({
                ...oldValues,
                userInfo:res.data.msg.userInfo,
                timeFeeCount:res.data.msg.timeFeeCount,
                timeDutyCount:res.data.msg.timeDutyCount,
                timeLeaveCount:res.data.msg.timeLeaveCount,
            }));
        })
    },[]);
    console.log(userInfo)
    return (
        <Card className={classes.card}>
            <CardActions>
                {/*<Button size="large">用户工号{userInfo&&userInfo.userInfo.userId}</Button>*/}
            </CardActions>

            <CardActions>
                <Button size="large">值班时间{   parseFloat(userInfo&&userInfo.timeDutyCount).toFixed(2)}小时</Button>
            </CardActions>
            <CardActions>
                <Button size="large">请假时间{  parseFloat(userInfo&&userInfo.timeLeaveCount).toFixed(2)}小时</Button>
            </CardActions>
            <CardActions>
                <Button size="large" >还剩余的时间
                    <span className={classes.color}>{(parseFloat(userInfo&&userInfo.timeDutyCount) - parseFloat(userInfo&&userInfo.timeLeaveCount) ).toFixed(2)}</span>小时
                </Button>
            </CardActions>
            <CardActions>
                <Button size="large">加班费时间{ parseFloat(userInfo&& userInfo.timeFeeCount).toFixed(2)}小时</Button>
            </CardActions>
        </Card>
    );
}
