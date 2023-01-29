const express = require("express");
const Route = express.Router();
const { loggedAlready } = require("../requires");
const authCons = require("../controllers/authCons")
// get Routes

//auth route - redirects to /login
Route.get("/", loggedAlready, authCons.home);

//login route
Route.get("/login", loggedAlready, authCons.get_login);

//signup route
Route.get("/signup", loggedAlready, authCons.get_signup);

// post Routes 
Route.post("/login", authCons.post_login);

//get the info and check them to register
Route.post("/signup", authCons.post_signup);

module.exports = Route;
