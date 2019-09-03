import React,{Component,useEffect,useState} from 'react';
import { makeStyles, useTheme,withStyles } from '@material-ui/core/styles';

import axios from 'axios';

import List from '../List/List'
import _ from 'lodash'
const useStyles2 = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
}));

export default function VerifyList() {
    const classes = useStyles2();

    const [verify,setVerifyList] = useState({verifyList:[]});
    useEffect(()=>{
        axios.get('/getVerifyList',{params:{page:0}}).then(res=>{
            setVerifyList(oldValues => ({
                ...oldValues,
                verifyList:res.data.msg.rows,
                count:res.data.msg.count
            }));
        })

    },[]);
    console.log('Verify',verify);


    let dutyList=[],feeList=[],leaveList=[],recordList=[],duty;
    for (var i = 0; i < verify&&verify.verifyList.length; i++) {
        _.map(verify.verifyList[i].Duty,v=>{
            duty= [
                {
                    end:v.end,
                    start:v.start,
                }
            ];
            dutyList.push(duty);

            console.log('dutyList555',dutyList);
        })
    }
    // _.map(verify&&verify.verifyList,(item,index)=>{
    //     console.log('item',dutyList.push(...item.Duty))
    //     duty = [
    //         dutyList.push(...item.Duty),
    //         item.username,
    //     ]
    //
    //
    //     // feeList ={
    //     //     dutyList:dutyList._concat(item.Fee),
    //     //     username:item.username,
    //     //
    //     // };
    //     // leaveList = {
    //     //     dutyList: dutyList.concat(item.Leave),
    //     //     username:item.username,
    //     //
    //     // };
    //     // recordList = {
    //     //     dutyList: dutyList.concat(item.Record),
    //     //     username:item.username,
    //     //
    //     // }
    //
    // });




    return (
        <div>
            {/*<List type="duty"   list={dutyList}/>*/}
            {/*<List type="fee" list={item.Fee}/>*/}
            {/*<List type="leave"  list={item.Leave}/>*/}
            {/*<List type="record"  list={item.Record}/>*/}
        </div>



    );
}
