const bluebird = require('bluebird');

const Fee = require('../models/fee');


exports.fee = async function(ctx, next){
	try{
		console.log('enter fee');


		let fees = await Fee.findAll({
			where :{
				userId:1
			}
		});


		if(fees){
			ctx.render('fee', {fees});
		}else{
			ctx.status = 404;
		}
	}catch(e){
		console.log('[/fees] error:', e.message, e.stack);
		ctx.body = {
			status: e.code || -1,
			body: e.message
		};
	}
};
exports.addFee = async function(ctx, next){
	try{
		const data = ctx.request.body;
		const result = await query(
			`insert into comment(userId,postId,content,createdAt) values("${ctx.cookies.get('userId')}", "${data.postId}", "${data.content}",${connection.escape(new Date())})`
		);
		if(result){
			ctx.redirect(`/post/${data.postId}`);
		}else{
			ctx.body = 'DB操作失败';
		}
	}catch(e){
		console.log('[/fee/addFee] error:', e.message, e.stack);
		ctx.body = {
			status: e.code || -1,
			body: e.message
		};
	}
};
