const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sessions = require('express-session');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const sessionService = require('./services/session.service')

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1)

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    name: "todo-project-session",
    secret: process.env.SESSION_COOKIE_SECRET,
    saveUninitialized:true,
    resave: false, 
    cookie: {
        maxAge: oneDay,
        secure: false,
        httpOnly:true,
        sameSite: 'lax'
    }
}));
app.use((req, res, next) => {
    console.log(req.path)
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ALLOW_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,Cache-Control,X-Access-Token,X-Requested-With,Content-Type, Accept, Authorization,Access-Control-Request-Method');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.path.includes('login') || req.path.includes('register')) {
        next();
        return
    } 

    if (req.method !== "OPTIONS" && !sessionService.sessionExists(req.session.userid)) {
        res.status(401).send('Unauthorized')
        return
    }

    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter)

module.exports = app;
