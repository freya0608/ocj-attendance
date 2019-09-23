import React,{Component,useEffect,useState} from 'react';
import { makeStyles, useTheme,withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

import Button from '@material-ui/core/Button';
import { message } from 'antd';

import axios from 'axios';
import moment from 'moment'

const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5),
    },
}));
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "rgb(220, 0, 78)",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);



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

export default function List(props) {
    const classes = useStyles2();
    // console.log('props',props)
    const {list} = props;

    console.log('list',list)

    function attendanceType() {
        switch (props.type) {
            case 'duty': return '值班';
            case 'leave': return '请假';
            case 'fee': return '加班费';
            case 'record': return '补卡';
        }
    }

    function submitPass (id,type){
        console.log('idddiididi',id,type);
        axios.post('/toPass',{
            id:id,
            type:type,
        }).then((res)=>{
            console.log('res',res);
            message.success('审批成功！',0);
            setTimeout(()=>{
                window.location.reload()
            },500)
        })
    }

    return (
        props.type!=="record"?
            <div>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>用户名</StyledTableCell>
                        <StyledTableCell align="center">考勤类型</StyledTableCell>
                        <StyledTableCell align="center">开始时间</StyledTableCell>
                        <StyledTableCell align="center">结束时间</StyledTableCell>
                        <StyledTableCell align="center">计时</StyledTableCell>
                        <StyledTableCell align="center">创建时间</StyledTableCell>
                        <StyledTableCell align="center">审核</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {list&&list.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">{props.username}</TableCell>
                            <TableCell component="th" scope="row">{attendanceType()||'无'}</TableCell>
                            <TableCell align="center">{moment(new Date(row.start)).format("YYYY-MM-DD HH:mm:ss")||'无'}</TableCell>
                            <TableCell align="center">{moment(new Date(row.end)).format("YYYY-MM-DD HH:mm:ss")||'无'}</TableCell>
                            <TableCell align="center">{row.time||'无'}</TableCell>
                            <TableCell align="center">{moment(new Date(row.createdAt)).format('YYYY-MM-DD HH:mm:ss')||'无'}</TableCell>
                            <TableCell align="center">
                                <Button variant="outlined"
                                        color="secondary"
                                        onClick={()=>submitPass(row.id,props.type)}>
                                    通过
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </div>
            :
            <div>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>用户名</StyledTableCell>
                        <StyledTableCell align="center">考勤类型</StyledTableCell>
                        <StyledTableCell align="center">补卡时间</StyledTableCell>
                        <StyledTableCell align="center">创建时间</StyledTableCell>
                        <StyledTableCell align="center">审核</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                        {list&&list.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{props.username||'无'}</TableCell>
                                <TableCell align="center">{attendanceType()||'无'}</TableCell>
                                <TableCell align="center">{moment(new Date(row.recordTime)).format('YYYY-MM-DD HH:mm:ss') ||'无'}</TableCell>
                                <TableCell align="center">{moment(new Date(row.createdAt)).format('YYYY-MM-DD HH:mm:ss')||'无'}</TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined"
                                            color="secondary"
                                            onClick={()=>submitPass(row.id,props.type)}>
                                        通过
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>

            </div>
    );
}
