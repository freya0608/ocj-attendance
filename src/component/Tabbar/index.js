import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './index.css';
const tabbarArr = [
    {
        img:'icon-icon_people_fill',
        text:'我的',
        link:'/index'
    },{
        img:'icon-kaoqinqingjia',
        text:'请假',
        link:'/leave'
    },{
        img:'icon-kaoqinguanli',
        text:'值班',
        link:'/duty'
    },{
        img:'icon-kaoqinjiaban',
        text:'加班费',
        link: '/fee'
    },{
        img:'icon-kaoqinbulu',
        text:'补卡',
        link:'/record'
    },{
        img:'icon-kaoqinbiao',
        text:'排班',
        link:'/arrange'
    }
];


var verify = {
        img:'icon-duihao',
        text:'审核',
        link:'/verify'
    };


// console.log(document.cookie.split(";")[0].split("=")[1]);
if(document.cookie.substring(document.cookie.indexOf('userId=')+7,document.cookie.indexOf('userId=')+13)==105668){
    tabbarArr.push(verify)
}

// console.log(tabbarArr);


const Tabbar = (WrappedComponent)=> class Tabbar extends Component {
        constructor(props){
            super(props);
            this.state={
                index:0
            }
        }
        itemChange = (index)=>{
            this.setState({
                index:index,
            })
        };

        render() {
            const url = window.location.href;
            return (
                <div className="tabbar-container">
                    <div className="tabbar">
                        <div className="tabbar-content">
                            {
                                tabbarArr.map((item,index)=>(
                                    <Link to={item.link} key={index}
                                className={"tabbar-item " + (url.indexOf(item.link) >-1?'active':'')}
                                // onClick={()=>this.itemChange(index)}
                                >
                                <div className={'iconfont '+ item.img}></div>
                                <div>{item.text}</div>
                                </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className="tabbar-chilren">
                        <WrappedComponent />
                    </div>
                </div>
            );
        }
};



export default Tabbar;
