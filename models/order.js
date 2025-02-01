module.exports = class Order {
    constructor(obj) {

        this.id = obj.id ?? -1;
        this.userId = obj.userId;
        this.adres = obj.adres;
        this.contact = obj.contact;
        this.vid_usl = obj.vid_usl;
        this.time_usl = obj.time_usl;
        this.pay = obj.pay;
        this.status = obj.status;
        this.date = obj.date ?? new Date().toDateString().substring(0, 10);
    }
};