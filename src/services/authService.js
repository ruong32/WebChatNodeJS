import UserModel from "./../models/userModel";
import bcryptjs from "bcryptjs";
import uuidv4 from "uuid/v4"
import {transErrors, transSuccess} from "./../../lang/vi";

let saltRounds = 7;

const register = (email, gender, password) => {
    return new Promise(async (resolve, reject) => {
        let userByEmail = await UserModel.findByEmail(email);
        if (userByEmail.deleteAt != null){
            return reject(transErrors.account_removed);
        }else if (!userByEmail.local.isActive){
            return reject(transErrors.account_not_active);
        } else if (userByEmail){
            return reject(transErrors.account_in_use);
        }

        let salt = bcryptjs.genSaltSync(saltRounds);
        let userItem = {
            username: email.split("@")[0],
            gender: gender,
            local: {
                email: email,
                password: bcryptjs.hashSync(password, salt),
                verifyToken: uuidv4()
            }
        };

        let user = await UserModel.createNew(userItem);
        resolve(transSuccess.userCreated(user.local.email));
        });
};

module.exports = {
    register: register
};
