const { bcrypt, _URL, _queryAsync } = require("../requires");
const signup_validate = require("../validation/signup_validaton");
const login_validate = require("../validation/login_validation");

//Route ("/auth")
const home = (req, res) => {
    res.redirect(_URL.login);
}

//Route ("/login")
const get_login = (req, res) => {
    res.render("./auth/login", { layout: 'authLayout' });
}
//Route ("/signup")
const get_signup = (req, res) => {
    res.render("./auth/signup", { layout: 'authLayout' });
}

//*here i get credentials from user and then i check if 
//*values are valid (using validation function which returns true or false),
//*after that i check to see if such user really exists in database


//Route ("/login")
const post_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await _queryAsync(`SELECT * FROM users WHERE Email = ?`, [email]);
        //validating function
        login_validate(email, password, (errors, isValid) => {
            if (!isValid) {
                return res.render('auth/login', { layout: 'authLayout', errors })
            }
            if (!user[0]) {
                return res.render("auth/login", { layout: 'authLayout', errors: ["Email not signed up!"] })
            }
            //check if password matches
            bcrypt.compare(password, user[0].Pass, (err, hash) => {
                if (err) throw err;
                if (!hash) {
                    return res.render("auth/login", { layout: 'authLayout', errors: ["Password not correct!"] })
                }
                //everything is correct - add the session
                req.session.userId = user[0].ID;
                res.redirect(_URL.home);
            })
        });
    } catch (err) {
        console.log(err);
    }
}

//Route ("/signup")
const post_signup = (req, res) => {
    try {
        const { name, email } = req.body;
        let password = req.body.password;
        signup_validate(name, email, password, (errors, isValid) => {
            if (!isValid) return res.render("./auth/signup", { layout: 'authLayout', errors });

            //hash the pass 
            bcrypt.genSalt(10, function (err, salt) {
                if (err) console.log(err);
                bcrypt.hash(password, salt, async function (err, hash) {
                    //we save hashed pass
                    password = hash;
                    //put the user in database
                    await _queryAsync(`INSERT INTO users (Name, Email, Pass) VALUES (?, ?, ?)`, [name, email, password]);
                    res.redirect(_URL.login);
                });
            });
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    home,
    get_login,
    get_signup,
    post_login,
    post_signup
}