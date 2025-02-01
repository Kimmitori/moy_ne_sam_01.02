const orderService = require('../services/order.service.js')
const Order = require('../models/order.js')

function _orderPage(request, response) {
    const userId = response.locals.userId

    orderService.findOrders(userId)
        .then(([rows]) => {
            const orders = rows.map(row => {
                return new Order({
                    ...row,
                    userId: row.user_id,
                    adres: row.adres,
                    contact: row.contact,
                    vid_usl: row.vid_usl,
                    time_usl: row.time_usl,
                    pay: row.pay,
                    status: row.status,
                    // date: new Date(row.created_at).toISOString().substring(0, 10)
                })
            })
            response.render('orders.hbs', { orders })
        })
}

exports.orderPage = function (request, response) {
    _orderPage(request, response)

}
exports.addOrderPage = function (request, response) {
    response.render('order.hbs')
}

exports.createOrder = function (request, response) {
    const orderData = request.body
    const userId = response.locals.userId
    const order = new Order({
        ...orderData,
        userId: userId
    })

    orderService.insertOrder(order)
        .then(() => {
            console.log('sql-result insert into orders - success!')
            response.send('success')
        })
        .catch((error) => {
            console.log('sql-result insert into orders - error!')
            console.error(error)

            response.status(500).send(error.sqlMessage)
        })
}