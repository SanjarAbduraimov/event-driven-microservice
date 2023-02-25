var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reciever: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  body: String,
  subject: String,
  category: String,
});

module.exports = mongoose.model("notification", notificationSchema);
