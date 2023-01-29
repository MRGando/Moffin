const express = require("express");
const Route = express.Router();
const homeCons = require("../controllers/homeCons");
const { loginRequired, wallpaper_upload, upload, _URL } = require("../requires");
//Routes
Route.get(_URL.home, loginRequired, homeCons.get_home);
//open specific Route
Route.get(_URL.note_add, loginRequired, homeCons.get_add);
//get specific event - id provided
Route.get(_URL.note_details_id, loginRequired, homeCons.get_detail);
//get specific event - id provided
Route.get(_URL.note_edit_id, loginRequired, homeCons.get_edit_id);
//delete specific task - id provided
Route.get(_URL.note_del_id, loginRequired, homeCons.get_change_del);
//get modify folders
Route.get(_URL.modify_folders, loginRequired, homeCons.get_folders)
//not found
Route.get(_URL.notFound, loginRequired, homeCons.get_notFound)
//delete account
Route.get(_URL.setting_deleteAccount, loginRequired, homeCons.get_deleteAccount);
//logout user - delete session
Route.get(_URL.logout, homeCons.post_logout);


//create a new folder
// 	folderID 	folderName 	folderColor 	userID 	
Route.post(_URL.modify_folders_add, loginRequired, homeCons.post_folders_add);
//delete an existing folder
Route.post(_URL.modify_folders_remove, loginRequired, homeCons.post_folderID);
//add a new task
Route.post(_URL.note_add, loginRequired, homeCons.post_add);
//save name
Route.post(_URL.setting, loginRequired, homeCons.post_change_setting);
//change user wallpaper - id provided
Route.post(_URL.setting_banner, loginRequired, wallpaper_upload.single('banner'), homeCons.post_change_banner);
//change user avatar - id provided
Route.post(_URL.setting_avatar, loginRequired, upload.single('avatar'), homeCons.post_change_avatar);
//edit specific task - id provided
Route.post(_URL.note_edit_id, loginRequired, homeCons.post_change_edit);



module.exports = Route;