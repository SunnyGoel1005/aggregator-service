const express = require('express')
const app = express()
const port = process.env.AGGREGATOR_PORT||3002
const request = require('request')
const usersource = process.env.USER_URL||"http://localhost:3000";
const ordersource = process.env.ORDER_URL||"http://localhost:3001";

let orderDetail = {
			"userDetails" : null,
			"orders" : null
		};

app.get('/orderdetails/:id', function (req, res) {
		request(usersource+'/user/1', {json : true }, (err, resp, body) => {
			if(err || !body){
				res.send("Error while getting user :" + err + " Body :" + body);
			}
			else{
				orderDetail.userDetails = body;
				request(ordersource+'/orders/1', {json : true }, (err, resp, body) => {
					if(err || !body){
						res.send("Error while getting orders :" + err + " Body :" + body);
					}
					else{
						orderDetail.orders = body;
						res.json(orderDetail);
					}		
				});
			}		
	    });
			 
});

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))