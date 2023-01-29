const express = require("express");
const Route = express.Router();
const homeRoutes = require("./homeRoutes");
const authRoutes = require("./authRoutes");

Route.use("/", homeRoutes);
Route.use("/auth", authRoutes);

// not found page
Route.use("*", (req, res) => {
    res.redirect("/notFound");
})


module.exports = Route;