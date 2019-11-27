import mongoose from 'mongoose';

const { Schema } = mongoose;

const NotificationSchema = new Schema({
  senderId: String,
  receiverId: String,
  type: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now }
});

NotificationSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  removeRequestContactNotification() {}
};

const NOTIFICATION_TYPE = {
  ADD_CONTACT: 'add_contact'
};

module.exports = {
  model: mongoose.model('notification', NotificationSchema),
  types: NOTIFICATION_TYPE
};
