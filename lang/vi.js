export const transValidation = {
  email_incorrect: 'Email không hợp lệ!',
  gender_incorrect: 'Gender kì lạ!',
  password_incorrect: 'Password chưa ổn!',
  password_confirmation_incorrect: 'Password confirm hơi sai!'
};

export const transErrors = {
  account_in_use: 'Email đã bị dùng!',
  account_removed: 'Email đã bay mày',
  account_not_active: 'Email đã đăng ký nhưng chưa được kích hoạt'
};

export const transSuccess = {
  userCreated: userEmail => {
    return `Vui lòng xác thực tài khoản qua email ${userEmail}`;
  }
};
