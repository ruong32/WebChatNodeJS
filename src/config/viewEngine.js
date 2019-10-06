import express from "express";
import expressEjsExtend from "express-ejs-extend";

//kiểu mình chưa kết thúc yêu cầu gửi lên server ấy
// ông xem lại xem có thiếu file js gì k
let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.engine("ejs", expressEjsExtend);
    app.set("view engine","ejs");
    app.set("views", "./src/views");
}

module.exports = configViewEngine;