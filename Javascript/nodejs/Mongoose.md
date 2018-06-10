
  # Mongoose
  ---
  
  
  ## 
  user.js
  
  ```
  var mongoose = require("mongoose");
  mongoose.Promise = require('bluebird');
  
  var db = mongoose.createConnection('localhost', 'nodejs', 27017);
  
  db.on('error', () => {
      console.error('连接错误:')
  });
  
  db.once('open', () => {
      console.log("数据库连接成功");
  });
  
  var UserSchema = new mongoose.Schema({
      id: { type: String },
      name: String
  });
  
  var UserModel = db.model("user", UserSchema);
  
  var userEntity = new UserModel({ id: 666, name: "孟健" });
  
  console.log(userEntity);
  userEntity.save(function (err, product, numAffected) {
      UserModel.find(function (err, users) {
          console.log(users);
      });
  });
  
  UserModel.create({ name: 123, id: 987 });
  ```