const express = require("express");
const app = express();
const Routes = require("./routes/index");
const { cors, _queryAsync, session, layout } = require("./requires")

class App {
  constructor() {
    this.Middlewares();
    this.Routes();
    this.Init();
  }

  Middlewares() {
    //middleware
    app.use(cors());
    app.use(express.static('public'));
    app.set("view engine", "ejs");
    app.use(layout);
    app.set("layout extractScripts", true);
    app.set("layout extractStyles", true);
    app.use(express.urlencoded({ extended: true }));
    app.use(session({
      cookieName: "session",
      secret: 'secrety',
      duration: 30 * 60 * 1000,
    }));


    //check if user session id exist when page load or reloaded
    app.use(async (req, res, next) => {
      if (!(req.session && req.session.userId)) {
        return next();
      }
      const user = await _queryAsync(`SELECT * FROM users WHERE ID = ?`, [req.session.userId]);
      if (!user[0]) {
        return next();
      }
      user.password = undefined;
      req.user = user[0];
      res.locals.user = user[0];

      next();
    })


  }

  Routes() {
    //Routes - go to Routes folder (index.js)
    app.use(Routes);
  }

  Init() {
    //server running here
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("server is running ...");
    });
  }
}

new App();