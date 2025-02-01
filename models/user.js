module.exports = class User {
    constructor(obj) {
       
        this.id = obj.id ?? -1;
        this.name = obj.name;
        this.email = obj.email;
        this.phone = obj.phone;
        this.login = obj.login;
        this.password = obj.password;
    }
};