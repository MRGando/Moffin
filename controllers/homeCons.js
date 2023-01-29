const { perDate, path, fs, _URL, _queryAsync } = require("../requires")
const { colorGenerator, idGenerator } = require("../public/functions/tools")


//functions
async function gather_info(callback) {
    let info = {
        users: [],
        admins: [],
        events: []
    }
    let q1 = _queryAsync("SELECT * FROM users");
    let q2 = _queryAsync("SELECT * FROM users WHERE isAdmin = 1");
    let q3 = _queryAsync("SELECT * FROM events");
    let results = await Promise.all([q1, q2, q3]);
    info.users = results[0];
    info.admins = results[1];
    info.events = results[2];
    callback(info);
}



// Route ("/")
const get_home = async (req, res) => {
    try {
        //if user is admin
        if (req.user.isAdmin === 1) {
            gather_info((info) => {
                res.render('admin', { events: info.events, users: info.users, admins: info.admins })
            })
        }
        //if user not admin
        const events = await _queryAsync("select * from events where userId = ?", [req.user.ID]);
        res.render("index", { events });
    } catch (err) {
        console.log(err);
    }
}

//Route ("/add")
const get_add = async (req, res) => {
    try {
        const folders = await _queryAsync("SELECT * FROM folders WHERE userID = ?", [req.user.ID])
        res.render("addItem", { layout: 'partialLayout', title: 'Add Note', folders })
    } catch (err) {
        console.log(err);
    }
}

//Route ("/detail/:id")
const get_detail = async (req, res) => {
    try {
        const event = await _queryAsync("SELECT * FROM events WHERE eventId = ?", [req.params.id]);
        res.render("detail", { event: event[0], id: req.params.id, layout: "partialLayout" });
        if (!event[0]) res.redirect(_URL.notFound);
    } catch (err) {
        console.log(err);
    }
}

//Route ("/change/del/:id")
const get_change_del = async (req, res) => {
    try {
        await _queryAsync("DELETE FROM events WHERE eventId = ?", [req.params.id]);
        res.redirect(_URL.home);
    } catch (err) {
        console.log(err);
    }
}

//Route ("/deleteAccount") - remove user information and photos
const get_deleteAccount = async (req, res) => {
    try {
        await _queryAsync("DELETE FROM users WHERE ID = ?", [req.user.ID]);
        await _queryAsync("DELETE FROM folders WHERE userID = ?", [req.user.ID]);
        await _queryAsync("DELETE FROM events WHERE userId = ?", [req.user.ID]);
        fs.unlink(path.join(__dirname + `/../public/uploads/profiles/avatar-${req.user.ID}.png`), (err) => console.log(err));
        fs.unlink(path.join(__dirname + `/../public/uploads/wallpapers/banner-${req.user.ID}.png`), (err) => console.log(err));
        res.redirect(_URL.home);
    } catch (err) {
        console.log(err);
    }
}

// Route ("/folders")
const get_folders = async (req, res) => {
    try {
        const folders = await _queryAsync("SELECT * FROM folders WHERE userID = ?", [req.user.ID]);
        res.render("modify", { layout: 'partialLayout', title: 'modify folders', folders });
    } catch (err) {
        console.log(err);
    }
}

//Route ("/notFound")
const get_notFound = (req, res) => {
    res.render("notFound");
}

//Route ("/edit/:id")
const get_edit_id = async (req, res) => {
    try {
        const folders = await _queryAsync("SELECT * FROM folders WHERE userID = ?", [req.user.ID]);
        const event = await _queryAsync("SELECT * FROM events WHERE eventId = ?", [req.params.id]);
        res.render("editItem", { event: event[0], id: req.params.id, folders, layout: "partialLayout" });
        if (!event[0]) res.redirect(_URL.notFound);
    } catch (err) {
        console.log(err);
    }
}

//Route ("folders/remove")
const post_folderID = async (req, res) => {
    try {
        const folderID = req.body.folder;
        await _queryAsync("DELETE FROM folders WHERE folderID = ?", [folderID])
        res.redirect(_URL.folders);
    } catch (err) {
        console.log(err);
    }
}

//Route ("/folders/add")
const post_folders_add = async (req, res) => {
    try {
        const folderName = req.body.folder;
        if (folderName.trim().length === 0) {
            return res.redirect(_URL.folders);
        }
        const result = await _queryAsync("SELECT * FROM folders WHERE folderName = ?", [folderName]);
        if (result[0]) {
            return res.redirect(_URL.folders);
        };
        await _queryAsync("INSERT INTO folders (folderName, folderColor, userID)  VALUES (?,?,?)", [folderName, colorGenerator(), req.user.ID]);
        res.redirect(_URL.folders);
    } catch (err) {
        console.log(err);
    }
}

//Route ("/add")
const post_add = async (req, res) => {
    try {
        const { title, content, folderID } = req.body;
        const folder = await _queryAsync("SELECT * FROM folders WHERE folderID = ?", [folderID]);
        const newItem = {
            userId: req.user.ID,
            title: title.trim() === '' ? 'no title' : title,
            content: content.trim() === '' ? 'no content' : content,
            date: new perDate().format("YYYY / MM / DD"),
            isDone: false,
            themeColor: folder[0] ? folder[0].folderColor : null,
            folderName: folder[0] ? folder[0].folderName : null,
            eventId: idGenerator()
        }
        await _queryAsync("INSERT INTO events VALUES (?, ?, ?, ?, ?, ?, ?)",
            [newItem.userId, newItem.title, newItem.content, newItem.date, newItem.themeColor, newItem.eventId, newItem.folderName])
        res.redirect(_URL.home);
    } catch (err) {
        console.log(err);
    }
}
//Route ("/change/setting")
const post_change_setting = async (req, res) => {
    try {
        const { name } = req.body;
        await _queryAsync('UPDATE users SET Name = ? WHERE ID = ?', [name, req.user.ID]);
        res.redirect(_URL.home);
    } catch (err) {
        console.log(err);
    }
}
//Route ("/change/banner")
const post_change_banner = async (req, res) => {
    await _queryAsync("UPDATE users SET banner = ? WHERE ID = ?", [`/uploads/wallpapers/banner-${req.user.ID}.png`, req.user.ID])
    res.redirect(_URL.home);

}

//Route ("/change/avatar")
const post_change_avatar = async (req, res) => {
    await _queryAsync("UPDATE users SET avatar = ? WHERE ID = ?", [`/uploads/profiles/avatar-${req.user.ID}.png`, req.user.ID])
    res.redirect(_URL.home);
}

const post_change_edit = async (req, res) => {
    try {
        const { title, content, folderID } = req.body;
        const folder = await _queryAsync("SELECT * FROM folders WHERE folderID = ?", [folderID]);
        const modifyItem = {
            themeColor: folder[0] ? folder[0].folderColor : null,
            folderName: folder[0] ? folder[0].folderName : null,
            title: title.trim() == '' ? 'no title' : title,
            content: content.trim() == '' ? 'no content' : content,
        }
        await _queryAsync("UPDATE events SET title = ?, themeColor = ? , folderName = ? , content = ? WHERE eventId = ?",
            [modifyItem.title, modifyItem.themeColor, modifyItem.folderName, modifyItem.content, req.params.id])
        res.redirect(_URL.home);
    } catch (err) {
        console.log(err);
    }
}

//Route ("/logout")
const post_logout = (req, res) => {
    req.session.userId = null;
    res.redirect(_URL.login);
}


module.exports = {
    get_home,
    get_add,
    get_detail,
    get_change_del,
    get_notFound,
    get_folders,
    get_edit_id,
    get_deleteAccount,
    post_folderID,
    post_folders_add,
    post_add,
    post_logout,
    post_change_setting,
    post_change_banner,
    post_change_avatar,
    post_change_edit,
}