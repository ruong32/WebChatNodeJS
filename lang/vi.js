export const transValidation =  {
    email_incorrect: "Email fail!",
    gender_incorrect: "Gender fail!",
    password_incorrect: "Password fail!",
    password_confirmation_incorrect: "Password confirm fail!"
};

export const transErrors = {
    account_in_use: "Email used!",
    account_removed: "Email removed",
    account_isActive: "Email not active"
};

export const transSuccess = {
    userCreated: (userEmail) => {
        return `Vui lòng xác thực tài khoản qua email ${userEmail}`;
    }
}