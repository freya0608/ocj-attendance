import React,{Component,useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
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
    console.log('props',props)
    const {list} = props;

    function attendanceType() {
        switch (props.type) {
            case 'duty': return '值班';
            case 'leave': return '请假';
            case 'fee': return '加班费';
            case 'record': return '补卡';
        }
    }

    return (
        props.type!=="record"?
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table className={classes.table}>
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
                            <TableRow key={list.id}>
                                <TableCell component="th" scope="row">{props.username}</TableCell>
                                <TableCell component="th" scope="row">{attendanceType()||'无'}</TableCell>
                                <TableCell align="center">{moment(new Date(row.start)).format("YYYY-MM-DD HH:mm:ss")||'无'}</TableCell>
                                <TableCell align="center">{moment(new Date(row.end)).format("YYYY-MM-DD HH:mm:ss")||'无'}</TableCell>
                                <TableCell align="center">{row.time||'无'}</TableCell>
                                <TableCell align="center">{moment(new Date(row.createdAt)).format('YYYY-MM-DD HH:mm:ss')||'无'}</TableCell>
                                <TableCell align="center">{row.isPass?'通过':'未审核'}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>
        </Paper>
            :
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table className={classes.table}>
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
                            <TableRow key={list.id}>
                                <TableCell component="th" scope="row">{props.username||'无'}</TableCell>
                                <TableCell align="center">{attendanceType()||'无'}</TableCell>
                                <TableCell align="center">{moment(new Date(row.recordTime)).format('YYYY-MM-DD HH:mm:ss') ||'无'}</TableCell>
                                <TableCell align="center">{moment(new Date(row.createdAt)).format('YYYY-MM-DD HH:mm:ss')||'无'}</TableCell>
                                <TableCell align="center">{row.isPass?'通过':'未审核'}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>
        </Paper>
    );
}
