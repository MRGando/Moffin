const { loginRequired, loggedAlready } = require("./validation/session_check");
const sql = require("./database/connection");
const multer = require("multer");
const perDate = require("persian-date").toLocale("en");
const validator = require("validator")
const bcrypt = require("bcrypt");
const path = require("path")
const fs = require('fs')
const cors = require("cors");
const session = require("client-sessions");
const layout = require("express-ejs-layouts");

//avatar upload path
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/uploads/profiles')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + req.user.ID + '.png')
    }
})
const upload = multer({ storage })

//wallpapers upload path
const wallpapers_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/uploads/wallpapers')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + req.user.ID + '.png')
    }
})
const wallpaper_upload = multer({ storage: wallpapers_storage })

const _queryAsync = (query, requires) => {
    return new Promise((resolve, reject) => {
        sql.query(query, requires, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        })
    })
}

//routes - DRY
const _URL = {
    //GET
    home: '/',
    folders: '/modify/folders',
    notFound: '/notFound',
    login: '/auth/login',
    note_add: '/note/add',
    note_details_id: '/note/details/:id',
    note_edit_id: '/note/edit/:id',
    note_del_id: '/note/del/:id',
    modify_folders: '/modify/folders',
    setting_deleteAccount: '/setting/deleteAccount',
    logout: '/logout',
    //POST
    modify_folders_add: '/modify/folders/add',
    modify_folders_remove: '/modify/folders/remove',
    note_add: '/note/add',
    setting: '/setting',
    setting_banner: '/setting/banner',
    setting_avatar: '/setting/avatar',
    note_edit_id: '/note/edit/:id',
}

module.exports = {
    sql,
    upload,
    wallpaper_upload,
    loginRequired,
    loggedAlready,
    perDate,
    bcrypt,
    validator,
    path,
    fs,
    _URL,
    _queryAsync,
    cors,
    session,
    layout

}