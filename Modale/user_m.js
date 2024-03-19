const mongoose = require("mongoose");
const { timestampsPlugin } = require("./plugin");

const userSchema = new mongoose.Schema({
     name:{type:String,require:true},
     email:{type:String,require:true},
})

userSchema.plugin(timestampsPlugin);

userSchema.virtual("id").get(function () {
     return this._id.toHexString();
   });
   
   userSchema.set("toJSON", {
     virtuals: true,
   });

exports.User = mongoose.model("users",userSchema)

