const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();
const cors = require('koa-cors');
const _ =  require('lodash');
const path = require('path');
const validate = require('./lib/validate');
const Joi = require('joi');
const statics = require('koa-static');
const moment =  require('moment')

const staticPath = './build';
const sequelize = require('sequelize');

const Fee = require('./models/fee');
const Duty = require('./models/duty');
const Leave = require('./models/leave');
const User = require('./models/user');
const Record = require('./models/record');
const Op = sequelize.Op;

app.use(statics(
    path.join(__dirname,staticPath)
));
app.use(statics('.'));

//http://m.ocj.com.cn/image_site/event/
app.use(bodyParser());

app.use(async (ctx,next) =>{
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});


app.use(async(ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    // ctx.response.body = '<h1>Hello,koa2222!</h1>';
    //   console.log('ctx use',ctx.url,ctx.method);
    if(ctx.method === 'GET'){ //当请求时GET请求时
        ctx.body =ctx.response.body;
    }else if(ctx.url==='/' && ctx.method === 'POST'){ //当请求时POST请求时
        ctx.body=await parsePostData(ctx);
    }
    // else{
    //     //其它请求显示404页面
    //     ctx.body='<h1>404!</h1>';
    // }

});

router.get('/userInfo', async(ctx, next) => {
    // console.log(ctx)
    const userId =  ctx.cookies.get('userId');
    console.log('9999')

    let timeFeeCount = await Fee.sum('time',{
        where :{
            userId:userId,
            IsDelete:0,
            isPass:1
        },

    });
    let timeDutyCount = await Duty.sum('time',{
        where :{
            userId:userId,
            IsDelete:0,
            isPass:1
        },
    });
    let timeLeaveCount = await Leave.sum('time',{
        where :{
            userId:userId,
            IsDelete:0,
            isPass:1
        },
    });
    let userInfo = await User.findOne({
        where :{
            userId:userId,
            IsDelete:0
        },
    });
    // console.log(feeList)
    ctx.response.body ={
        status:200,
        msg:{
            timeFeeCount,
            timeDutyCount,
            timeLeaveCount,
            userInfo
        }
    }

});

router.get('/getDutyList', async(ctx, next) => {

    const {
        page,
    } = await validate(ctx.query, {
        page: Joi.number().integer().min(0).default(0),
    });

    console.log(page)
    const userId =  ctx.cookies.get('userId')


    let dutyList = await Duty.findAndCountAll({
        where :{
            userId:userId,
            IsDelete:0
        },
        limit: 15,
        offset: page*15,
        order:[['createdAt','DESC']],

    });
    ctx.response.body ={status:200,msg:dutyList}

});
router.get('/getLeaveList', async(ctx, next) => {

    const {
        page,
    } = await validate(ctx.query, {
        page: Joi.number().integer().min(0).default(0),
    });

    console.log(page)
    const userId =  ctx.cookies.get('userId')


    let leaveList = await Leave.findAndCountAll({
        where :{
            userId:userId,
            IsDelete:0
        },
        limit: 15,
        offset: page*15,
        order:[['createdAt','DESC']],

    });
    ctx.response.body ={status:200,msg:leaveList}

});
router.get('/getFeeList', async(ctx, next) => {
    // console.log(ctx)
    const userId =  ctx.cookies.get('userId')

    const {
        page,
    } = await validate(ctx.query, {
        page: Joi.number().integer().min(0).default(0),
    });
    let feeList = await Fee.findAndCountAll({
        where :{
            userId:userId,
            IsDelete:0
        },
        order: sequelize.literal('createdAt DESC'),
        limit: 15,
        offset: page*15,
    });
    // console.log(feeList)
    ctx.response.body ={status:200,msg:feeList}


});
router.get('/getRecordList', async(ctx, next) => {
    // console.log(ctx)
    const userId =  ctx.cookies.get('userId')

    const {
        page,
    } = await validate(ctx.query, {
        page: Joi.number().integer().min(0).default(0),
    });
    let recordList = await Record.findAndCountAll({
        where :{
            userId:userId,
            IsDelete:0
        },
        order: sequelize.literal('createdAt DESC'),
        limit: 15,
        offset: page*15,
    });
    // console.log(feeList)
    ctx.response.body ={status:200,msg:recordList}


});
router.get('/getVerifyList', async(ctx, next) => {
    // console.log(ctx)
    const userId =  ctx.cookies.get('userId')

    const {
        page,
    } = await validate(ctx.query, {
        page: Joi.number().integer().min(0).default(0),
    });
    let managers = await  User.findAll({
        where :{
            managerId:userId,
            IsDelete:0
        },
    });
    let userIdList=[];

     _.map(managers, v => v.toJSON())
        .map((v) => {
            userIdList = userIdList.concat(v.userId);
        });
    console.log('userIdList',userIdList)

    console.log('page',page);
    let verifyList = await User.findAndCountAll({
        limit: 1,
        offset: page*1,
        include:[
            {
                model: Duty,
                as: 'Duty',
                where:{
                    isPass:0,
                    isDelete:0,
                    userId:{[Op.in]:userIdList}
                },
                order: sequelize.literal('createdAt DESC'),
                required: false
            },{
                model: Fee,
                as: 'Fee',
                where:{
                    isPass:0,
                    isDelete:0,
                    userId:{[Op.in]:userIdList}
                },
                order: sequelize.literal('createdAt DESC'),
                required: false
            },{
                model: Leave,
                as: 'Leave',
                where:{
                    isPass:0,
                    isDelete:0,
                    userId:{[Op.in]:userIdList}
                },
                order: sequelize.literal('createdAt DESC'),
                required: false
            },{
                model: Record,
                as: 'Record',
                where:{
                    isPass:0,
                    isDelete:0,
                    userId:{[Op.in]:userIdList}
                },
                order: sequelize.literal('createdAt DESC'),
                required: false
            },
        ]
    });

    // console.log('verifyList66',verifyList)
    ctx.response.body ={status:200,msg:verifyList}


});
router.post('/addDuty', async(ctx, next) => {
    const {isPass,inputDutyStart,inputDutyEnd} =  ctx.request.body;
    const userId =  ctx.cookies.get('userId')

    let consumingHours = moment.duration(moment(inputDutyEnd).valueOf()- moment(inputDutyStart).valueOf()).as('hours');
    consumingHours = parseFloat(consumingHours.toFixed(2))
    console.log(isPass,inputDutyStart,inputDutyEnd);


    let addDuty = await Duty.create({
        userId:userId,
        time:consumingHours,
        start:inputDutyStart,
        end:inputDutyEnd,
        isPass:false,
        IsDelete:false,
    });
    ctx.response.body ={status:200,msg:addDuty}

});
router.post('/addLeave', async(ctx, next) => {
    const {isPass,inputLeaveStart,inputLeaveEnd} =  ctx.request.body;
    const userId =  ctx.cookies.get('userId')

    let consumingHours = moment.duration(moment(inputLeaveEnd).valueOf()- moment(inputLeaveStart).valueOf()).as('hours');
    consumingHours = parseFloat(consumingHours.toFixed(2))
    console.log(isPass,inputLeaveStart,inputLeaveEnd,consumingHours);


    let addLeave = await Leave.create({
        userId:userId,
        time:consumingHours,
        start:inputLeaveStart,
        end:inputLeaveEnd,
        isPass:false,
        IsDelete:false,
        include: [
            {
                model: User,
                as: 'User'
            }]
    });
    ctx.response.body ={status:200,msg:addLeave}

});


router.post('/addFee', async(ctx, next) => {
    let {isPass,inputFeeStart,inputFeeEnd} =  ctx.request.body;
    const userId =  ctx.cookies.get('userId');
    console.log('userId',userId)
    console.log(isPass,inputFeeStart,inputFeeEnd);
    let consumingHours = moment.duration(moment(inputFeeEnd).valueOf()- moment(inputFeeStart).valueOf()).as('hours');
    consumingHours = parseFloat(consumingHours.toFixed(2))
    let addFee = await Fee.create({
        userId:userId,
        time:consumingHours,
        start:inputFeeStart,
        end:inputFeeEnd,
        isPass:0,
        IsDelete:0
    });
    ctx.response.body ={status:200,msg:addFee}

});

router.post('/addRecord', async(ctx, next) => {
    let {inputRecordTime} =  ctx.request.body;
    const userId =  ctx.cookies.get('userId');
    console.log('userId',userId)
    let addRecord = await Record.create({
        userId:userId,
        recordTime:inputRecordTime,
        isPass:0,
        IsDelete:0
    });
    ctx.response.body ={status:200,msg:addRecord}

});

router.post('/toPass',async (ctx,next)=>{
    let {id,type} = ctx.request.body;
    console.log('idddiididi',id,type);

    if(type=='duty'){
        const [duty] = await Duty.update({
            isPass: 1
        },{
            where:{
                id:id
            }
        });
    }else  if(type=='fee'){
        const [fee] = await Fee.update({
            isPass: 1
        },{
            where:{
                id:id
            }
        });
    }else if(type=='leave'){
        const [leave] = await Leave.update({
            isPass: 1
        },{
            where:{
                id:id
            }
        });
    }else if(type=='record'){
        const [record] = await Record.update({
            isPass: 1
        },{
            where:{
                id:id
            }
        });
    }

    ctx.response.body ={
        status:200,
        msg:'通过'
    }
});
router.post('/login', async(ctx, next) => {
    try{
        const {password,username} =  ctx.request.body;

        console.log(password,username);

        let user = await User.findOne({
            where :{
                password:password,
                userId:username,
                IsDelete:0
            },
        });
        console.log(user.userId);

        if(user){

            // 登录成功，设置cookie
            ctx.cookies.set('userId', user.userId, {httpOnly:false});
            ctx.body = {
                status: 200,
                userId: user.userId,
                username: user.username
            };
        }else{
            throw new Error('登录失败');
        }
    }catch (e) {
        console.log('[/user/login] error:', e.message, e.stack);
        ctx.body = {
            status: e.code || -1,
            body: e.message
        };
    }




});



router.options('*', async(ctx, next) => {
    // 设置跨域
    allowCross(ctx);
    next();
});

function parsePostData( ctx ) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.addListener('data', (data) => {
                postdata += data
            })
            ctx.req.addListener("end",function(){
                let parseData = parseQueryStr( postdata );
                resolve( parseData )
            })
        } catch ( err ) {
            reject(err)
        }
    })
}
function parseQueryStr( queryStr ) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    console.log( queryStrList );
    for (  let [ index, queryStr ] of queryStrList.entries()  ) {
        let itemList = queryStr.split('=');
        queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
    }
    return queryData
}


function allowCross(ctx) {
    ctx.header('Access-Control-Allow-Origin', '*');
    ctx.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.header("X-Powered-By",' 3.2.1');
    ctx.header("Content-Type", "application/json;charset=utf-8");
}




app.use(cors());
app.use(router.routes());

app.listen(9999);
