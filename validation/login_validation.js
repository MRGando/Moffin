const { validator } = require("../requires")

function validation(email, password, callback) {
    let error = [];
    if (validator.isEmpty(email) || validator.isEmpty(password)) { error.push("provide credentials!"); return callback(error, false) }
    if (!validator.isEmail(email)) error.push("email not valid!");
    //is there any error so far ?
    if (error.length > 0) {
        return callback(error, false)
    }
    //return true
    callback(error, true)

}


module.exports = validation;