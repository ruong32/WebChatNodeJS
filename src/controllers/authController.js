import {validationResult} from "express-validator/check";
import {auth} from "./../services/index";

const getLoginRegister = (req, res) => {
    return res.render("auth/master", {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

const postRegister = async (req, res) => {
    let errorArr = [];
    let successArr = [];

    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()){
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorArr.push(item.msg);
        });
        req.flash("errors", errorArr)
        return res.redirect("login-register");
    }
    try {
        let createUserSuccessfully = await auth.register(req.body.email, req.body.gender, req.body.password);
        successArr.push(createUserSuccessfully);
        req.flash("success", successArr)
        return res.redirect("login-register");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr)
        return res.redirect("login-register");
    }
};

module.exports = {
    getLoginRegister: getLoginRegister,
    postRegister: postRegister
};
