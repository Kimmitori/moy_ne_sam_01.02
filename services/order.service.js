const db = require('./db.service.js')

exports.findOrders = function (userId) {

    return db.execute('SELECT * FROM orders where user_id = ?', [userId])

}
exports.insertOrder = function (order) {
    const data = [order.userId, order.adres, order.contact, order.vid_usl, order.time_usl, order.pay]
    return db.execute('insert into orders (user_id, adres, contact, vid_usl, time_usl, pay) values (?,?,?,?,?,?)', data)

}