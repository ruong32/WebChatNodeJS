import multer from 'multer';
import uuidv4 from 'uuid/v4';
import fsExtra from 'fs-extra';
import { validationResult } from 'express-validator/check';
import { app } from '../config/app';
import { transErrors, transSuccess } from '../../lang/vi';
import { user } from '../services/index';

// update avatar
let storageAvatar = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, app.avatar_directiory);
  },
  filename: (req, file, callback) => {
    let math = app.avatar_type;
    if (math.indexOf(file.mimetype) === -1) {
      return callback(transErrors.avatar_type, null);
    }
    let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
    callback(null, avatarName);
  }
});
let avatarUploadFile = multer({
  storage: storageAvatar,
  limits: { fileSize: app.avatar_limit_size }
}).single('avatar');
let updateAvatar = (req, res) => {
  avatarUploadFile(req, res, async err => {
    if (err) {
      if (err.message) {
        return res.status(500).send(transErrors.avatar_size);
      }
      return res.status(500).send(err);
    }
    try {
      // update user
      let updateUserItem = {
        avatar: req.file.filename,
        updateAt: Date.now()
      };
      let update = await user.updateUser(req.user._id, updateUserItem);

      // remove old avatar
      await fsExtra.remove(`${app.avatar_directiory}/${update.avatar}`);
      let result = {
        message: transSuccess.info_updated,
        imageSrc: `/images/users/${req.file.filename}`
      };
      // console.log(result);
      return res.status(200).send(result);
    } catch (error) {
      // console.log(error);
      return res.status(500).send(error);
    }
  });
};

// update info
let updateInfo = async (req, res) => {
  const errorArr = [];
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = Object.values(validationErrors.mapped());
    errors.forEach(item => {
      errorArr.push(item.msg);
    });
    return res.status(500).send(errorArr);
  }

  try {
    let updateUserItem = req.body;
    await user.updateUser(req.user._id, updateUserItem);
    let result = {
      message: transSuccess.info_updated
    };
    // console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  updateAvatar: updateAvatar,
  updateInfo: updateInfo
};
