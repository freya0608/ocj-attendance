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

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    function handleFirstPageButtonClick(event) {
        onChangePage(event, 0);
    }

    function handleBackButtonClick(event) {
        onChangePage(event, page - 1);
    }

    function handleNextButtonClick(event) {
        onChangePage(event, page + 1);
    }

    function handleLastPageButtonClick(event) {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


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

export default function RecordList() {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const [record,setRecordList] = useState({recordList:[]});
    useEffect(()=>{
        axios.get('/getRecordList',{params:{page:0}}).then(res=>{
            // console.log(res)
            setRecordList(oldValues => ({
                ...oldValues,
                recordList:res.data.msg.rows,
                count:res.data.msg.count
            }));
        })

    },[]);
    // console.log('Record',Record)

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, record.count - page * rowsPerPage);

    function handleChangePage(event, newPage) {
        console.log('newPage',newPage)
        setPage(newPage);
        axios.get('/getRecordList',{params:{page:newPage}}).then(res=>{
            // console.log(res)
            setRecordList(oldValues => ({
                ...oldValues,
                recordList:res.data.msg.rows,
                count:res.data.msg.count
            }));
        })
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 15));
        setPage(0);
    }

    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>用户id</StyledTableCell>
                            <StyledTableCell align="center">开始时间</StyledTableCell>
                            <StyledTableCell align="center">结束时间</StyledTableCell>
                            <StyledTableCell align="center">计时</StyledTableCell>
                            <StyledTableCell align="center">创建时间</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)*/}
                        {record&&record.recordList&&record.recordList.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">{row.userId}</TableCell>
                                <TableCell align="center">{moment(new Date(row.recordTime)).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                                <TableCell align="center">{moment(new Date(row.createdAt)).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[15]}
                                colSpan={3}
                                count={record.count}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'Record.RecordList per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </Paper>
    );
}
