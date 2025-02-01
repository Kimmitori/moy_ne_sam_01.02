const express = require("express");
const path = require("path");
const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));

const userRouter = require("./routes/user.router.js");
const homeRouter = require("./routes/home.router.js");
const orderRouter = require("./routes/order.router.js");

app.use("/auth", userRouter);
app.use("/order", orderRouter);
app.use("/", homeRouter);

app.listen(3000, function () {
    console.log("Сервер ожидает подключение по адресу localhost:3000...");
});

module.exports = app;