const bluebird = require('bluebird');

const Duty = require('../models/duty');


exports.duty = async function(ctx, next){
	try{
		console.log('enter duty');

		// const id = ctx.params.id;
		// console.log('duty id',id)

		let dutys = await Duty.findAll({
			where :{
				userId:1
			}
		});

		// console.log('sss',duty)


		if(dutys){
			ctx.render('duty', {dutys});
		}else{
			ctx.status = 404;
		}
	}catch(e){
		console.log('[/duty] error:', e.message, e.stack);
		ctx.body = {
			status: e.code || -1,
			body: e.message
		};
	}
};

