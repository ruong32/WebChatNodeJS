export const transValidation = {
  email_incorrect: 'Email không hợp lệ!',
  gender_incorrect: 'Gender kì lạ!',
  password_incorrect: 'Password chưa ổn!',
  password_confirmation_incorrect: 'Password confirm hơi sai!'
};

export const transErrors = {
  account_in_use: 'Email đã bị dùng!',
  account_removed: 'Email đã bay màu!',
  account_not_active: 'Email đã đăng ký nhưng chưa được kích hoạt!',
  token_null: 'Token không tồn tại!'
};

export const transSuccess = {
  userCreated: userEmail => {
    return `Vui lòng xác thực tài khoản qua email ${userEmail}`;
  },
  account_actived: `Kích hoạt tài khoản thành công!`
};

export const transMail = {
  subject: `Xác nhận email Web Chat`,
  template: verifyLink => {
    return `<h2>Click vào link bên dưới để kích hoạt tài khoản</h2>
    <h3><a href="${verifyLink}" targer="blank">${verifyLink}</a></h3>`;
  },
  send_failed: `Có lỗi khi gửI email!`
};
