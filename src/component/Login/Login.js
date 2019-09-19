import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import axios from 'axios';
const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(2),
        display:"block"
    },
    width:500
}));

export default function InputWithIcon() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: '',
        username:'null',
    });
    function inputUsername (e){
        let username = e.target.value;
        setValues(oldValues => ({
            ...oldValues,
            username:username
        }));
    }
    function inputPassword (e){
        let password = e.target.value;
        setValues(oldValues => ({
            ...oldValues,
            password:password
        }));
    }
    function submitLogin(){
        axios.post('/login',{
            password:values.password,
            username:values.username,
        }).then((res)=>{
            console.log('res',res);
            if(res.data.status==200){
                // HashRouter.push({
                //     pathname: '/index'
                // })
                console.log(window.location);
                window.location.href=window.location.origin+"/#/index";
                console.log('登录成功');
            }else{
                console.log('登录失败');
            }
        })
    }
    return (
        <div  style={{position: "absolute", left: "40%",top: "30%"}}>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="input-with-icon-adornment">填写账户</InputLabel>
                <Input
                    id="input-username"
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                    onChange={inputUsername}

                />
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="input-with-icon-adornment">填写密码</InputLabel>
                <Input
                    id="input-password"
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                    onChange={inputPassword}

                />
            </FormControl>
            <Button variant="contained"
                    color="primary"
                    style={{height:'40px',marginTop:'15px',width:'20%'}}
                    className={classes.margin}
                    onClick={submitLogin}
            >
                登陆
            </Button>
        </div>
    );
}
