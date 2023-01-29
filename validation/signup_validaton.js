const { validator } = require("../requires")

function validation(name, email, password, callback) {
  let error = [];
  if (validator.isEmpty(email) || validator.isEmpty(password)) { error.push("provide credentials!"); return callback(error, false) }
  if (!validator.isLength(name, { min: 3 })) error.push("name must be at least 3 chars!");
  if (!validator.isEmail(email)) error.push("email not valid!");
  if (!validator.isStrongPassword(password, { minLength: 8, minUppercase: 1, minSymbols: 1, minNumbers: 1 })) error.push("Password must be 8 chars and include a symbol, uppercase, number!")
  
  //is there any error so far ?
  if (error.length > 0) {
    return callback(error, false)
  }
  //return true
  callback(error, true)

}


module.exports = validation;
