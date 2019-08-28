
import React from 'react';
import { HashRouter as Router, Route,Switch,Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddDuty from '../AddDuty/AddDuty';
import AddFee from '../AddFee/AddFee';
import FeeList from '../FeeList/FeeList';
import DutyList from '../DutyList/DutyList';
import UserInfo from '../UserInfo/UserInfo';
import LeaveList from "../LeaveList/LeaveList";
import AddLeave from "../AddLeave/AddLeave";
import AddRecord from "../AddRecord/AddRecord";
import RecordList from "../RecordList/RecordList";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ScrollableTabsButtonPrevent() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="off"
                    aria-label="scrollable prevent tabs example"
                >
                    <Tab icon={<PersonPinIcon />} label="我的信息" {...a11yProps(0)} />
                    <Tab icon={<PhoneIcon />} label="值班" {...a11yProps(1)} />
                    <Tab icon={<HelpIcon />} label="请假" {...a11yProps(2)} />
                    <Tab icon={<FavoriteIcon />} label="加班费" {...a11yProps(3)} />
                    <Tab icon={<ShoppingBasket />} label="补卡" {...a11yProps(4)} />
                    <Tab icon={<ThumbDown />} label="审批" {...a11yProps(5)} />
                    <Tab icon={<ThumbUp />} label="排班" {...a11yProps(6)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                个人信息
                <UserInfo/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                填写值班
                <AddDuty/>
                值班记录
                <DutyList/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                填写请假
                <AddLeave/>
                请假记录
                <LeaveList/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                填写加班费
                <AddFee/>
                加班费记录
                <FeeList/>
            </TabPanel>

            <TabPanel value={value} index={4}>
                补卡
                <AddRecord/>
                补卡记录
                <RecordList/>
            </TabPanel>
            <TabPanel value={value} index={5}>
               审批
            </TabPanel>
            <TabPanel value={value} index={6}>
               排班
            </TabPanel>
        </div>
    );
}
